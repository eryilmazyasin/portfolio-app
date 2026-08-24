export type ContactActionResult =
  | { success: true }
  | { success: false; error: string }
