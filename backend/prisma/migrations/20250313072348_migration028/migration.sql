-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentID" TEXT,
ALTER COLUMN "productID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
