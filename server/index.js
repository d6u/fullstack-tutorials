import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.get("/books", async (req, res) => {
  const allBooks = await prisma.exampleBook.findMany();
  res.send(allBooks);
});

app.listen(3000, () => {
  console.log(`Web app listening on port 3000`);
});
