"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "@/app/store/categories/category.reducer";
import { getCategoriesAndDocuments } from "@/app/utils/firebase.utils";
import Category from "@/app/components/category/category.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
      console.log(categoriesArray);
    };

    getCategoriesMap();
  }, []);

  return (
    <Category />
  )
}

export default Shop