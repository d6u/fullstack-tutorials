import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.exampleBook.create({
    data: {
      name: "Fullstack Tutorials",
      description: "A tutorial for fullstack development",
    },
  });

  const allBooks = await prisma.exampleBook.findMany();

  console.log(allBooks);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
