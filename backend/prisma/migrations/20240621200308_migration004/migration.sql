/*
  Warnings:

  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserImage" DROP CONSTRAINT "UserImage_customerId_fkey";

-- DropTable
DROP TABLE "UserImage";

-- CreateTable
CREATE TABLE "CustomerImage" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "dateCreaded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerImage_customerId_key" ON "CustomerImage"("customerId");

-- AddForeignKey
ALTER TABLE "CustomerImage" ADD CONSTRAINT "CustomerImage_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
