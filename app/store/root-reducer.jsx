import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories/category.reducer";


export const rootReducer = combineReducers({
  categories: categoriesReducer,
});

export default rootReducer;