"use client"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../../store/categories/category.reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import Category from "../../components/category/category.component";
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