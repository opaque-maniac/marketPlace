/*
  Warnings:

  - You are about to drop the column `discountPercentage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discountPercentage",
DROP COLUMN "price",
ADD COLUMN     "buyingPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sellingPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
