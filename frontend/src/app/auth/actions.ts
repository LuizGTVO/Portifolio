"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(password: string) {
  if (password === "admluiz") {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "admluiz", {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });
    return { success: true };
  }
  return { success: false, error: "Senha incorreta." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/");
}

