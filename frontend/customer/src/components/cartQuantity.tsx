interface Props {
  quantity: number;
  callback: (value: number) => void;
  id: string;
}

const CartQuantity = ({ quantity, callback, id }: Props) => {
  return (
    <div>
      <div>
        <button></button>
      </div>
      <div>{quantity}</div>
      <div>
        <button></button>
      </div>
    </div>
  );
};

export default CartQuantity;
