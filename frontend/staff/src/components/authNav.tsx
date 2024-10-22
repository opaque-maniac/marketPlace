import ProductsDropMenu from "./dropmenus/products";
import CustomersDropMenu from "./dropmenus/customers";
import SellerDropMenu from "./dropmenus/seller";
import StaffDropMenu from "./dropmenus/staff";
import CartDropMenu from "./dropmenus/cart";
import CartItemsDropMenu from "./dropmenus/cartitems";
import WishlistDropMenu from "./dropmenus/wishlist";
import WishlistItemsDropMenu from "./dropmenus/wishlistitems";
import OrdersDropMenu from "./dropmenus/orders";
import OrderItemsDropMenu from "./dropmenus/orderitems";
import ComplaintsDropMenu from "./dropmenus/complaints";
import CommentDropMenu from "./dropmenus/comments";

const AuthNavigation = () => {
  return (
    <ul
      style={{ overflowY: "scroll" }}
      className="h-screen scroll-mod-col pt-4"
    >
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <ProductsDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <CustomersDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <SellerDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <StaffDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <CartDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <CartItemsDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <WishlistDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <WishlistItemsDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <OrdersDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <OrderItemsDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <CommentDropMenu />
      </li>
      <li className="border bg-gray-200 h-14 mb-4 flex justify-between items-center px-2">
        <ComplaintsDropMenu />
      </li>
    </ul>
  );
};

export default AuthNavigation;
