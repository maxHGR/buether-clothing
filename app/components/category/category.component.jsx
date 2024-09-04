"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component"


const Category = () => {
  const category = "hats"
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

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