import prisma from "../lib/db";
import { ContactInput } from "../validators/contact";
import { ContactMessage } from "../types";

export class ContactService {
  static async createMessage(input: ContactInput): Promise<ContactMessage> {
    try {
      const message = await prisma.contactMessage.create({
        data: {
          name: input.name,
          email: input.email,
          message: input.message,
        },
      });
      return message;
    } catch (error) {
      console.error("Erro no ContactService ao criar mensagem:", error);
      throw new Error("Não foi possível salvar a mensagem no banco de dados.");
    }
  }

  static async getAllMessages(): Promise<ContactMessage[]> {
    try {
      const messages = await prisma.contactMessage.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return messages;
    } catch (error) {
      console.error("Erro no ContactService ao buscar mensagens:", error);
      throw new Error("Não foi possível carregar as mensagens do banco de dados.");
    }
  }
}
export default ContactService;
