"use client"
import Image from "next/image"
import { useDispatch } from "react-redux";

import { addItemToCart } from "@/app/store/cart/cart.reducer";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const ProductCard = ({product, category}) => {
  const { id, imageUrl, name, price } = product;
  const dispatch = useDispatch();

  const addProduct = () => dispatch(addItemToCart(product));

  const cartNotify = () => toast.success("added to cart", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const onClickHandler = () => {
    addProduct();
    cartNotify();
  }

  return (
    <div key={id} className="flex-row justify-between">
      <div>
        <Image src={imageUrl} className="max-w-[350px] max-h-[350px]" height="350" width="350" alt="product example"/>
      </div>
      <h1 className="text-xl mt-1">{name}</h1>
      <p>{category}</p>
      <h2 className="text-lg">{`€${price}`}</h2>
      <button className="border p-1 rounded-md self-end" onClick={onClickHandler}>Add to Cart</button>
    </div>
  )
}

export default ProductCard