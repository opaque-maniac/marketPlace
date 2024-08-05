-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_customerID_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartID_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerID_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productID_fkey";

-- DropForeignKey
ALTER TABLE "SellerImage" DROP CONSTRAINT "SellerImage_sellerID_fkey";

-- DropForeignKey
ALTER TABLE "StaffImage" DROP CONSTRAINT "StaffImage_staffID_fkey";

-- DropForeignKey
ALTER TABLE "UserImage" DROP CONSTRAINT "UserImage_customerID_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_customerID_fkey";

-- DropForeignKey
ALTER TABLE "WishListItem" DROP CONSTRAINT "WishListItem_productID_fkey";

-- DropForeignKey
ALTER TABLE "WishListItem" DROP CONSTRAINT "WishListItem_wishlistID_fkey";

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerImage" ADD CONSTRAINT "SellerImage_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffImage" ADD CONSTRAINT "StaffImage_staffID_fkey" FOREIGN KEY ("staffID") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartID_fkey" FOREIGN KEY ("cartID") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_wishlistID_fkey" FOREIGN KEY ("wishlistID") REFERENCES "WishList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
