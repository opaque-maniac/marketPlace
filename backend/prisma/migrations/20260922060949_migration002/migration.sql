/*
  Warnings:

  - You are about to drop the `Seller` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizationID` to the `SellerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Misconduct" DROP CONSTRAINT "Misconduct_sellerID_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_sellerID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerID_fkey";

-- DropForeignKey
ALTER TABLE "SellerImage" DROP CONSTRAINT "SellerImage_sellerID_fkey";

-- AlterTable
ALTER TABLE "SellerProfile" ADD COLUMN     "organizationID" TEXT NOT NULL;

-- DropTable
DROP TABLE "Seller";

-- CreateTable
CREATE TABLE "SellerOrganization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SellerOrganization_name_key" ON "SellerOrganization"("name");

-- AddForeignKey
ALTER TABLE "SellerImage" ADD CONSTRAINT "SellerImage_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "SellerOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerProfile" ADD CONSTRAINT "SellerProfile_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "SellerOrganization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "SellerOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "SellerOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Misconduct" ADD CONSTRAINT "Misconduct_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "SellerOrganization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
