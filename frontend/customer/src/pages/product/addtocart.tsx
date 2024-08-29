interface Props {
  id: string;
  color: string;
  text: string;
}

const AddToCart = ({ id, color, text }: Props) => {
  return (
    <button className={`rounded h-10 w-40 bg-${color} text-${text}`}>
      Add To Cart
    </button>
  );
};

export default AddToCart;
