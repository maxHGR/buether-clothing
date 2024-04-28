import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";
import { cartReducer } from "./cart/cart.reducer";


export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;