import { createSlice } from "@reduxjs/toolkit";

const storedFavoriteList = localStorage.getItem('favoriteList')
  ? JSON.parse(localStorage.getItem('favoriteList')) : [];

const initialState = {
  favoriteList: storedFavoriteList
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productExit = state.favoriteList.find(
        (item) => item.id === productToAdd.id
      );
      if (productExit) {
        
        state.favoriteList = state.favoriteList.map((item) =>
          item.id === action.payload.product.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item
        );
      } else {
        state.productExit=false;
        state.favoriteList.push({ ...productToAdd, qty: quantity });
      }
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== productToDelete.id
      );
    },
    clearFavorite:(state,action)=>{
      state.favoriteList = action.payload
    }
  },
});

export const favoriteMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type?.startsWith('favorite/')) {
      const favoriteList = store.getState().favorite.favoriteList;
      localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    }
    return result;
};

export const { addToFavorite, decreaseQty, deleteProduct,clearFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
