import { Request, Response } from "express";
import { contactSchema } from "../validators/contact";
import ContactService from "../services/contactService";
import EmailService from "../services/emailService";
import { ApiResponse } from "../types";

export class ContactController {
  static async handleContactMessage(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = contactSchema.safeParse(req.body);

      if (!validationResult.success) {
        const errors: Record<string, string[]> = {};
        
        validationResult.error.errors.forEach((err) => {
          const path = err.path.join(".");
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });

        const response: ApiResponse = {
          success: false,
          message: "Dados de envio inválidos.",
          errors,
        };

        res.status(400).json(response);
        return;
      }

      const validatedData = validationResult.data;
      const message = await ContactService.createMessage(validatedData);

      // Send real email notification asynchronously
      EmailService.sendContactNotification(
        validatedData.name,
        validatedData.email,
        validatedData.message
      ).catch((err) => console.error("Falha ao enviar e-mail de notificação:", err));

      const response: ApiResponse = {
        success: true,
        message: "Mensagem enviada com sucesso!",
        data: message,
      };

      res.status(201).json(response);
    } catch (error: any) {
      console.error("Erro na rota de contato:", error);
      
      const response: ApiResponse = {
        success: false,
        message: "Erro interno no servidor ao processar sua mensagem.",
      };
      
      res.status(500).json(response);
    }
  }
}
export default ContactController;
