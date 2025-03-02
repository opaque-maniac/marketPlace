/*
  Warnings:

  - Added the required column `userEmail` to the `Misconduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Misconduct" ADD COLUMN     "userEmail" TEXT NOT NULL;
