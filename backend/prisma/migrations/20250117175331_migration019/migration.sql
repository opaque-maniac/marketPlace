/*
  Warnings:

  - Added the required column `sellerID` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "sellerID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
