import dotenv from "dotenv";
dotenv.config({ override: true });
import prisma from "./lib/db";

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("Tentando conectar ao banco via Prisma...");
  try {
    const projects = await prisma.project.findMany({ take: 1 });
    console.log("CONEXÃO ESTABELECIDA COM SUCESSO!", projects);
  } catch (err) {
    console.error("ERRO DE CONEXÃO:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
