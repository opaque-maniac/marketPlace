-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
