/*
  Warnings:

  - Changed the type of `role` on the `SellerProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SellerProfile" DROP COLUMN "role",
ADD COLUMN     "role" "SELLER_ROLE" NOT NULL;
