"use server";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, registerSchema } from "@/validators/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function login(formData: any) {
  const validation = loginSchema.safeParse(formData);
  if (!validation.success) {
    return { success: false, error: "Dados inválidos." };
  }

  const { email, password } = validation.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/dashboard");
}

export async function signup(formData: any) {
  const validation = registerSchema.safeParse(formData);
  if (!validation.success) {
    return { success: false, error: "Dados inválidos." };
  }

  const { name, email, password } = validation.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  const user = data.user;

  if (user) {
    try {
      await prisma.profile.create({
        data: {
          id: user.id,
          email: user.email || email,
          role: "user",
        },
      });
    } catch (dbError: any) {
      console.error("Erro ao criar perfil no banco de dados:", dbError);
    }
  }

  return { 
    success: true, 
    message: "Cadastro realizado com sucesso! Prossiga com o login." 
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
