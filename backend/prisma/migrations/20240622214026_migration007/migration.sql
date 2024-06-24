/*
  Warnings:

  - Changed the type of `staffId` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "staffId",
ADD COLUMN     "staffId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");
