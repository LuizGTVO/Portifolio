import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ContactController from "./controllers/contactController";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security basic setups
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*", // Configurable client origin
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.post("/api/contact", ContactController.handleContactMessage);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global uncaught error:", err);
  res.status(500).json({
    success: false,
    message: "Ocorreu um erro inesperado no servidor.",
  });
});

app.listen(PORT, () => {
  console.log(`[Server] Rodando com sucesso na porta ${PORT}`);
});
