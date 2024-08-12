import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import favoriteSlice, { favoriteMiddleware } from "./features/favorite/favoriteSlice";
import productSlice from "./features/products/productSlice";
import compareSlice,{ compareMiddleware } from "./features/compare/compareSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorite:favoriteSlice,
    products:productSlice,
    compare:compareSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware,favoriteMiddleware,compareMiddleware),
});
