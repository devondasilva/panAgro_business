import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Le CLI utilisera la connexion directe pour exécuter tes migrations
    url: env("DIRECT_URL"), 
  },
});