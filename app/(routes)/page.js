'use client'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../store/categories/category.reducer";
import { getCategoriesAndDocuments } from "../utils/firebase.utils";

export default function Home() {
  return (
    <>
      <div className='landingImage flex h-screen'></div>
    </>
  )
}
