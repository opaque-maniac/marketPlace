/*
  Warnings:

  - You are about to drop the column `url` on the `CustomerImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `SellerImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `SellerProfileImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `StaffImage` table. All the data in the column will be lost.
  - Added the required column `filename` to the `CustomerImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `SellerImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `SellerProfileImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `StaffImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerImage" DROP COLUMN "url",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "url",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellerImage" DROP COLUMN "url",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellerProfileImage" DROP COLUMN "url",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StaffImage" DROP COLUMN "url",
ADD COLUMN     "filename" TEXT NOT NULL;
