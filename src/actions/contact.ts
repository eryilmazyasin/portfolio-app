"use server";

import { db } from '@/db';
import { messages } from '@/db/schema';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

import type { ContactActionResult } from "@/actions/contact.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const { success: isAllowed } = await ratelimit.limit(clientIp);
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

  try {
    await db.insert(messages).values({ name, email, subject, content });
    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
