"use server"

import { db } from "@/db"
import { messages } from "@/db/schema"
import type { ContactActionResult } from "@/actions/contact.types"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readTextField(formData: FormData, field: string): string {
  const value = formData.get(field)

  return typeof value === "string" ? value.trim() : ""
}

export async function submitContactForm(
  _previousState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  // useActionState önceki sonucu ilk parametre olarak iletir; gerçek form verisi ikinci parametrede bulunur.
  const name = readTextField(formData, "name")
  const email = readTextField(formData, "email").toLowerCase()
  const subject = readTextField(formData, "subject")
  const content = readTextField(formData, "message")

  // HTML doğrulamasına ek olarak sunucuda tekrar kontrol yapmak doğrudan Action çağrılarını da güvenli hale getirir.
  if (name.length < 2 || name.length > 100) {
    return { success: false, error: "Please enter a valid name." }
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  if (subject.length < 3 || subject.length > 160) {
    return {
      success: false,
      error: "Please enter a subject between 3 and 160 characters.",
    }
  }

  if (content.length < 10 || content.length > 5000) {
    return {
      success: false,
      error: "Please enter a message between 10 and 5000 characters.",
    }
  }

  try {
    // insert().values() şema tiplerini kullanarak eksik veya hatalı kolon değerlerini derleme aşamasında yakalar.
    await db.insert(messages).values({ name, email, subject, content })

    return { success: true }
  } catch (error) {
    console.error("Failed to submit contact form:", error)

    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    }
  }
}
