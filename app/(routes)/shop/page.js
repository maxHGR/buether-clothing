"use client"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "@/app/store/categories/category.reducer";
import { getCategoriesAndDocuments } from "@/app/utils/firebase.utils";
import Category from "@/app/components/category/category.component";
import Link from "next/link";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
  }, []);

  return (
    <div>
      <Category />
    </div>
  )
}

export default Shop