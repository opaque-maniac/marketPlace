-- CreateEnum
CREATE TYPE "RESPONSE" AS ENUM ('WARN_USER', 'DISABLE_PROFILE', 'DELETE_PROFILE');

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Misconduct" (
    "id" TEXT NOT NULL,
    "personelID" TEXT NOT NULL,
    "response" "RESPONSE" NOT NULL,
    "customerID" TEXT,
    "sellerID" TEXT,
    "staffID" TEXT,
    "misconduct" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Misconduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderID_key" ON "Payment"("orderID");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Misconduct" ADD CONSTRAINT "Misconduct_personelID_fkey" FOREIGN KEY ("personelID") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Misconduct" ADD CONSTRAINT "Misconduct_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Misconduct" ADD CONSTRAINT "Misconduct_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Misconduct" ADD CONSTRAINT "Misconduct_staffID_fkey" FOREIGN KEY ("staffID") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
