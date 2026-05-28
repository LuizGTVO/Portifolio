import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(100, "O nome não pode exceder 100 caracteres.")
    .trim(),
  email: z
    .string()
    .email("Por favor, insira um e-mail válido.")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(2000, "A mensagem não pode exceder 2000 caracteres.")
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;
