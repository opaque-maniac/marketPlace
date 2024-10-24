import NavItem from "./navitem";

type Data = {
  placeholder: string;
  label: string;
  url: string;
};

const data: Data[] = [
  {
    placeholder: "Find Product",
    label: "Products",
    url: "/products",
  },
  {
    placeholder: "Find Customer",
    label: "Customers",
    url: "/customers",
  },
  {
    placeholder: "Find Seller",
    label: "Seller",
    url: "/sellers",
  },
  {
    placeholder: "Find Staff",
    label: "Staff",
    url: "/staff",
  },
  {
    placeholder: "Cart ID or email",
    label: "Cart",
    url: "/carts",
  },
  {
    placeholder: "Cart Item ID",
    label: "Cart Items",
    url: "/cartitems",
  },
  {
    placeholder: "Wishlist ID or email",
    label: "Wishlists",
    url: "/wishlists",
  },
  {
    placeholder: "Wishlist Item ID",
    label: "Wishliste Items",
    url: "/wishlistitems",
  },
  {
    placeholder: "Order ID",
    label: "Order",
    url: "/orders",
  },
  {
    placeholder: "Order Item ID",
    label: "Order Items",
    url: "/orderitems",
  },
  {
    placeholder: "Find Complaint",
    label: "Complaints",
    url: "/complaints",
  },
];

interface Props {
  callback: () => void;
}

const AuthNavigaton = ({ callback }: Props) => {
  return (
    <nav className="h-screen overflow-y-scroll scroll-v-mod">
      <ul>
        {data.map((item) => (
          <li key={item.label} className="mb-4">
            <NavItem
              placeholder={item.placeholder}
              url={item.url}
              label={item.label}
              callback={callback}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AuthNavigaton;
