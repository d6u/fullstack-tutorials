-- CreateTable
CREATE TABLE "ExampleBook" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ExampleBook_pkey" PRIMARY KEY ("id")
);
