"use server";

import { db } from '@/db';
import { messages } from '@/db/schema';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';
import { Resend } from 'resend';

import type { ContactActionResult } from "@/actions/contact.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_RECIPIENT = "yasineryilmazfb@gmail.com";
const CONTACT_SENDER = "Portfolio Contact <onboarding@resend.dev>";
const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// 🛡️ DISTRIBUTED SLIDING WINDOW RATE LIMITER
// ==========================================
// Serverless fonksiyonlar stateless çalıştığı için bellek paylaşımı yapamaz.
// Upstash Redis kullanarak tüm edge/serverless worker'lar arasında merkezi istek takibi yapıyoruz.
// 10 dakika içinde aynı IP adresinden en fazla 3 mesaja izin verilir.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  analytics: true,
  prefix: "portfolio:contact",
});

function readTextField(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(
  _previousState: ContactActionResult | null,
  formData: FormData,
): Promise<ContactActionResult> {
  // 1. Honeypot Bot Tuzağı Kontrolü
  const honeypot = readTextField(formData, "botField");
  if (honeypot) {
    return { success: true };
  }

  // 2. IP Bazlı Dağıtık Rate Limit Kontrolü
  const headerList = await headers();
  const clientIp =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";

  let isAllowed: boolean;

  try {
    const rateLimitResult = await ratelimit.limit(clientIp);
    isAllowed = rateLimitResult.success;
  } catch (error) {
    console.error("Failed to check contact form rate limit:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }

  if (!isAllowed) {
    return {
      success: false,
      error:
        "Too many messages sent. Please wait a few minutes before trying again.",
    };
  }

  // 3. Form Alanları ve Doğrulama
  const name = readTextField(formData, "name");
  const email = readTextField(formData, "email").toLowerCase();
  const subject = readTextField(formData, "subject");
  const content = readTextField(formData, "message");

  if (name.length < 2 || name.length > 100) {
    return { success: false, error: "Please enter a valid name." };
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (subject.length < 3 || subject.length > 160) {
    return {
      success: false,
      error: "Please enter a subject between 3 and 160 characters.",
    };
  }

  if (content.length < 10 || content.length > 5000) {
    return {
      success: false,
      error: "Please enter a message between 10 and 5000 characters.",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return {
      success: false,
      error: "Email delivery is temporarily unavailable. Please try again later.",
    };
  }

  try {
    await db.insert(messages).values({ name, email, subject, content });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }

  try {
    // Düz metin gövde kullanımı kullanıcı girdisinin HTML olarak yorumlanmasını engeller.
    const { error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: [CONTACT_RECIPIENT],
      replyTo: email,
      subject: `Yeni İletişim Mesajı: ${name}`,
      text: [
        `Gönderenin Adı: ${name}`,
        `E-posta: ${email}`,
        `Form Konusu: ${subject}`,
        "",
        "Mesaj:",
        content,
      ].join("\n"),
    });

    if (error) {
      console.error("Failed to send contact email:", error);
      return {
        success: false,
        error:
          "Your message was saved, but the email notification could not be sent. Please try again later.",
      };
    }
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      error:
        "Your message was saved, but the email notification could not be sent. Please try again later.",
    };
  }

  return { success: true };
}
