import nodemailer from "nodemailer";

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });

  static async sendContactNotification(name: string, email: string, message: string): Promise<boolean> {
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || "luizgmenino@gmail.com";
    const senderUser = process.env.SMTP_USER || "";
    const senderPass = process.env.SMTP_PASS || "";

    if (!senderUser || !senderPass) {
      console.warn(
        "[EmailService] Envio de e-mail real ignorado: SMTP_USER ou SMTP_PASS não estão configurados no arquivo .env."
      );
      console.info(`[EmailService] Simulando e-mail de ${name} (${email}) para ${receiver}: "${message}"`);
      return false;
    }

    try {
      const mailOptions = {
        from: `"Portfólio Luiz Gustavo" <${senderUser}>`,
        to: receiver,
        replyTo: email,
        subject: `Novo Contato do Portfólio: ${name}`,
        text: `Você recebeu uma nova mensagem de contato de seu portfólio.\n\nNome: ${name}\nE-mail: ${email}\nMensagem:\n${message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #6366f1;">Novo Contato do Portfólio</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
            <p><strong>Mensagem:</strong></p>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`[EmailService] E-mail de notificação enviado com sucesso para ${receiver}`);
      return true;
    } catch (error) {
      console.error("[EmailService] Erro ao enviar e-mail com Nodemailer:", error);
      return false;
    }
  }
}
export default EmailService;
