import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import favoriteSlice, { favoriteMiddleware } from "./features/favorite/favoriteSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorite:favoriteSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware,favoriteMiddleware),
});
