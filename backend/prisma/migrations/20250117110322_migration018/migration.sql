/*
  Warnings:

  - You are about to drop the column `orderID` on the `Order` table. All the data in the column will be lost.
  - Made the column `totalAmount` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderID",
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "totalAmount" SET NOT NULL;
