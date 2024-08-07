import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import favoriteSlice, { favoriteMiddleware } from "./features/favorite/favoriteSlice";
import productSlice from "./features/products/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorite:favoriteSlice,
    products:productSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware,favoriteMiddleware),
});
