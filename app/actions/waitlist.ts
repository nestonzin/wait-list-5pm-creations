"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function addToWaitlist(formData: FormData) {
  const email = formData.get("email");
  const phone = formData.get("phone");

  console.log("📧 Received form data:", { email, phone });

  try {
    const { data, error } = await supabase
      .from("early_access_users")
      .insert([
        {
          email,
          phone,
        },
      ])
      .select();

    console.log("✅ Supabase response:", { data, error });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.log("❌ Error:", error);
    return { success: false, error: "Failed to add to waitlist" };
  }
}
