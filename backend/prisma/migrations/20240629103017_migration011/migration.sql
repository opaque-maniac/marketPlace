-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteItems" (
    "id" TEXT NOT NULL,
    "favoriteId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_customerId_key" ON "Favorites"("customerId");

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteItems" ADD CONSTRAINT "FavoriteItems_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteItems" ADD CONSTRAINT "FavoriteItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
