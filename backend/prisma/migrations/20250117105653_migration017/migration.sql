/*
  Warnings:

  - You are about to drop the column `delivered` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ready` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivered",
DROP COLUMN "ready";
