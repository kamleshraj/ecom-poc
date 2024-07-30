import { useEffect, useState } from "react";

const PriceRangeSlider=({setFilterList,products})=>{
    const [priceRange, setPriceRange] = useState([50, 100]);
    const handleSliderChange = (event) => {
        const value = event.target.value.split(',').map(Number);
        setPriceRange(value);
      };
    
      useEffect(() => {
        const filteredProducts = products.filter(product =>
          product.price >= priceRange[50] && product.price <= priceRange[100]
        );
        setFilterList(filteredProducts);
      }, [priceRange, setFilterList, products]);
    return(
        <div className="filter-product-by-price">
        <h5>Price</h5>
        <input
        type="range"
        min="0"
        max="100"
        value={priceRange.join(',')}
        onChange={handleSliderChange}
        step="1"
      />
      <div>
        <span>Min: {priceRange[0]}</span>
        <span>Max: {priceRange[1]}</span>
      </div>
        </div>
    )
}

export default PriceRangeSlider