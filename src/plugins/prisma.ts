import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Создаем пул соединений с PostgreSQL
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

// Создаем адаптер для Prisma
const adapter = new PrismaPg(pool);

// Экспортируем Prisma клиент с адаптером
export const prisma = new PrismaClient({
	adapter,
});
