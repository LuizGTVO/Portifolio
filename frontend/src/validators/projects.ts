import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "O título deve ter pelo menos 2 caracteres.").trim(),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres.").trim(),
  githubUrl: z.string().url("Insira uma URL do GitHub válida.").or(z.literal("")).nullable().optional(),
  liveUrl: z.string().url("Insira uma URL de demonstração válida.").or(z.literal("")).nullable().optional(),
  technologies: z.string().transform((val) => 
    val.split(",").map((t) => t.trim()).filter(Boolean)
  ),
  featured: z.preprocess((val) => val === "true" || val === true, z.boolean()).default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;
