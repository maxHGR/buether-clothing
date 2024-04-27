import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";


export const rootReducer = combineReducers({
  categories: categoriesReducer,
  user: userReducer,
});

export default rootReducer;