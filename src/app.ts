import express from "express";
import { router } from "./routes";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
const port = 3000;
const prismadb = new PrismaClient();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  await prismadb.$disconnect();
  process.exit(0);
});
