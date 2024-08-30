import Image from "next/image";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="w-100 flex  h-20 mb-3.5">
    <div className="w-1/3">
      <Image src={imageUrl} alt={`${name}`} width={100} height={100} />
    </div>
      <div className="flex flex-col items-center justify-center w-2/3 text-base">
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;