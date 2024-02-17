import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.get("/books", async (req, res) => {
  const allBooks = await prisma.exampleBook.findMany();
  res.send(allBooks);
});

app.listen(3000, () => {
  console.log(`Web app listening on port 3000`);
});
