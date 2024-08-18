import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const storedCompareList = localStorage.getItem('compareList')
  ? JSON.parse(localStorage.getItem('compareList')) : [];

const initialState = {
  compareList: storedCompareList,
  isOpenModal:false,
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const productToCompare = action.payload.product;
      const quantity = action.payload.num;
      
      // Check if the compareList already has 6 items
      if (state.compareList.length >= 6) {
        toast.error("You can only compare up to 6 items.");
        return;
      }
      
      if(state.compareList.length >0){
        const firstProductCategory = state.compareList[0].category;
        if (firstProductCategory !== productToCompare.category) {
          toast.error('Compare only same category product');
          return;
        }
      }
      const productExit = state.compareList.find(
        (item) => item.id === productToCompare.id
      );
      if (productExit) {
        state.compareList = state.compareList.map((item) =>
          item.id === action.payload.product.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item);
      } else {
        state.productExit=false;
        state.compareList.push({ ...productToCompare, qty: quantity });
        state.isOpenModal=true
      }
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.compareList = state.compareList.filter(
        (item) => item.id !== productToDelete.id
      );
    },
    setOpenModal:(state, action)=>{
      state.isOpenModal = action.payload
    },
    resetModal:(state,action)=>{
      state.compareList=action.payload
    }
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

export const { addToCompare, deleteProduct,setOpenModal,resetModal} = compareSlice.actions;
export default compareSlice.reducer;
