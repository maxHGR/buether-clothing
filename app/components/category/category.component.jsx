"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "@/app/store/categories/category.selector";
import ProductCard from "@/app/components/product-card/product-card.component"


const Category = () => {
  const category = "hats"
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  console.log(products);

  return (
      <div className=" mx-auto my-auto flex flex-wrap gap-5">
        {
          products && products.map((product) => {
            return (
              <ProductCard key={product.id} product={product} category={category}/>
            )
          })
        }
      </div>
  )
}

export default Category