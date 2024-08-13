import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  searchWord: '',
  selectedCategory: 'All',
  selectedColors: [],
};

const filterProducts = (products, category, color = [], searchTerm = '', price = 0) => {
  return products.filter((item) => {
    const matchesCategory = category === 'All' || item.category.toLowerCase() === category.toLowerCase();
    const matchesColor = !color || color.length === 0 || color.includes(item.color);
    const matchesSearch = item.name && searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const filteredPrice = price > 0 ? item.price <= price : true;

    return matchesCategory && matchesColor && matchesSearch && filteredPrice;
  });
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
      state.filteredProducts = filterProducts(state.products, state.selectedCategory, state.selectedColor, action.payload);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterProducts(state.products, action.payload, state.selectedColor, state.searchWord);
    },
    setSelectedColors: (state, action) => {
        state.selectedColors = action.payload;
        state.filteredProducts = filterProducts(state.products, state.selectedCategory, action.payload, state.searchWord);
    },
    setProductPriceRange: (state, action) => {
        state.filteredProducts = filterProducts(state.products, state.selectedCategory, state.selectedColors, state.searchWord, action.payload)
    },
  },
});

export const { setProducts, setSearchWord, setSelectedCategory, setSelectedColors,setProductPriceRange } = productsSlice.actions;
export default productsSlice.reducer;
