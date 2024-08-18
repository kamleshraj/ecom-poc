import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "../Redux/cart/cartSlice";
import favoriteSlice, { favoriteMiddleware } from "../Redux/favorite/favoriteSlice";
import productSlice from "../Redux/products/productSlice";
import compareSlice,{ compareMiddleware } from "../Redux/compare/compareSlice";

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
