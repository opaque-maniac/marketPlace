/*
  Warnings:

  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserImage" DROP CONSTRAINT "UserImage_customerID_fkey";

-- DropTable
DROP TABLE "UserImage";

-- CreateTable
CREATE TABLE "CustomerImage" (
    "id" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerImage_customerID_key" ON "CustomerImage"("customerID");

-- AddForeignKey
ALTER TABLE "CustomerImage" ADD CONSTRAINT "CustomerImage_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
