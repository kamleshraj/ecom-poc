import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProductPriceRange } from "../../Redux/products/productSlice";


export const PriceRangeSlider = () => {
  const [priceRange, setPriceRange] = useState(200);
  const dispatch = useDispatch();

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange(value);
    dispatch(setProductPriceRange(value));
  };

  return (
    <div className="filterPriceWrapper">
      <h6>Price Range</h6>
      <input
        type="range"
        min="50"
        max="1000"
        value={priceRange}
        onChange={handlePriceChange}
        step="1"
        className="w-100"
      />
      <div className="d-flex align-items-center justify-content-between">
        <span className="min-text">Min: 50</span>
        <span className="max-text">Max: {priceRange}</span>
      </div>
    </div>
  );
};
