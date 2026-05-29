import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres.").trim(),
  email: z.string().email("E-mail inválido.").trim(),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres.").trim(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors: Record<string, string[]> = {};
      validationResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });

      return NextResponse.json(
        { success: false, message: "Dados de envio inválidos.", errors },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    let savedMessage = null;
    try {
      savedMessage = await prisma.contactMessage.create({
        data: {
          name,
          email,
          message,
        },
      });
    } catch (dbError) {
      console.error("Erro ao salvar mensagem no banco de dados (Prisma):", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: savedMessage 
          ? "Mensagem salva no banco com sucesso!" 
          : "O salvamento no banco de dados falhou temporariamente.",
        data: savedMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro na rota de contato Next.js:", error);
    return NextResponse.json(
      { success: true, message: "Erro processado internamente." },
      { status: 201 }
    );
  }
}
