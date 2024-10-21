/*
  Warnings:

  - You are about to drop the column `totalAmout` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalAmout",
ADD COLUMN     "totalAmount" DOUBLE PRECISION;
