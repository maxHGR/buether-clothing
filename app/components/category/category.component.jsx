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

  // FIX
  // make this component for category previews with associating link
  // 

  return (
      <div className="flex flex-wrap justify-around gap-y-4">
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