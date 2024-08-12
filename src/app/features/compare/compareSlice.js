import { createSlice } from "@reduxjs/toolkit";

const storedCompareList = localStorage.getItem('compareList')
  ? JSON.parse(localStorage.getItem('compareList')) : [];

const initialState = {
  compareList: storedCompareList,
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const productToCompare = action.payload.product;
      const quantity = action.payload.num;
      const productExit = state.compareList.find(
        (item) => item.id === productToCompare.id
      );
      if (productExit) {
        state.compareList = state.compareList.map((item) =>
          item.id === action.payload.product.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item
        );
      } else {
        state.productExit=false;
        state.compareList.push({ ...productToCompare, qty: quantity });
      }
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.compareList = state.compareList.filter(
        (item) => item.id !== productToDelete.id
      );
    },
  },
});

export const compareMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type?.startsWith('compare/')) {
      const compareList = store.getState().compare.compareList;
      localStorage.setItem('compareList', JSON.stringify(compareList));
    }
    return result;
};

export const { addToCompare, deleteProduct } = compareSlice.actions;
export default compareSlice.reducer;
