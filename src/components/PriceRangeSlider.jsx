import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { setProductPriceRange } from "../app/features/products/productSlice";

const PriceRangeSlider = () => {
  const [priceRange, setPriceRange] = useState(200);
  const dispatch = useDispatch();

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange(value)
    dispatch(setProductPriceRange(value));
  };

  return (
    <div className="filter-product-by-price">
      <h5>Price</h5>
      <input
        type="range"
        min="50"
        max="1000"
        value={priceRange}
        onChange={handlePriceChange}
        step="1"
      />
      <div>
        <span>Min: 50</span>
        <span>Max: {priceRange}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
