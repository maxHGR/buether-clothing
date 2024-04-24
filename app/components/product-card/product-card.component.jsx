"use client"
import Image from "next/image"

export const ProductCard = ({product, category}) => {
  return (
    <div key={product.id} className="flex-row justify-between">
    <div>
      <Image src={product?.imageUrl} className="max-w-[350px] max-h-[350px]" height="350" width="350" alt="product example"/>
    </div>
    <h1 className="text-xl mt-1">{product.name}</h1>
    <p>{category}</p>
    <h2 className="text-lg">{`€${product.price}`}</h2>
  </div>
  )
}

export default ProductCard