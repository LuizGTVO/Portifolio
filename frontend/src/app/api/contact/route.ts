import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres.").trim(),
  email: z.string().email("E-mail inválido.").trim(),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres.").trim(),
});

async function sendContactNotification(name: string, email: string, message: string): Promise<boolean> {
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "luizgmenino@gmail.com";
  
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${receiver}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Novo Contato do Portfólio: ${name}`,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success === "true" || data.success === true) {
        console.log(`[EmailService] E-mail enviado com sucesso para ${receiver} via FormSubmit`);
        return true;
      }
      console.error(`[EmailService] FormSubmit respondeu com erro interno:`, data);
      return false;
    } else {
      const errorText = await response.text();
      console.error(`[EmailService] Erro na requisição do FormSubmit (Status ${response.status}):`, errorText);
      return false;
    }
  } catch (error) {
    console.error("[EmailService] Erro de rede ao conectar com FormSubmit:", error);
    return false;
  }
}

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

    // 1. Tentar salvar no banco de dados usando Prisma Client (tolerante a falhas)
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
      // Loga o erro, mas NÃO bloqueia a execução caso o banco esteja fora do ar / pausado / sem variáveis
    }

    // 2. Disparar notificação por e-mail usando a API do FormSubmit (via HTTP, livre de bloqueios de porta)
    const emailSent = await sendContactNotification(name, email, message);

    if (!emailSent) {
      return NextResponse.json(
        { 
          success: false, 
          message: "O envio do e-mail falhou. Por favor, tente novamente mais tarde." 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: savedMessage 
          ? "Mensagem enviada e salva com sucesso!" 
          : "Mensagem enviada com sucesso! (O salvamento no banco falhou temporariamente, mas o e-mail foi entregue)",
        data: savedMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro na rota de contato Next.js:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor ao processar sua mensagem." },
      { status: 500 }
    );
  }
}
