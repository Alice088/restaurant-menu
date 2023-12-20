-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);
