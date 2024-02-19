import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.get("/books", async (req, res) => {
  if (req.query.q == null || req.query.q === "") {
    const allBooks = await prisma.exampleBook.findMany();
    res.send(allBooks);
    return;
  }

  const allBooks = await prisma.exampleBook.findMany({
    where: {
      OR: [
        {
          name: {
            contains: req.query.q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: req.query.q,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  res.send(allBooks);
});

app.listen(3000, () => {
  console.log(`Web app listening on port 3000`);
});
