"use client"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { selectCategoriesMap } from "../../../store/categories/category.selector";
import ProductCard from "../../../components/product-card/product-card.component";



const Category = () => {
  const params = useParams();
  const category = params.category[0];
  console.log(params.category[0]);
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  
  return (
    <div className="flex flex-wrap justify-around ">
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