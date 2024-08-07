import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedColors } from '../app/features/products/productSlice';

const ColorFilter = () => {
  const dispatch = useDispatch();
  const selectedColors = useSelector((state) => state.products.selectedColors);
  const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White"];
  
  const handleCheckboxChange = (color) => {
    let updatedColors;
    if (selectedColors.includes(color)) {
      updatedColors = selectedColors.filter((c) => c !== color);
    } else {
      updatedColors = [...selectedColors, color];
    }
    dispatch(setSelectedColors(updatedColors));
  };

  return (
    <div>
      {colors.map((color) => (
        <div key={color}>
          <label>
            <input
              type="checkbox"
              value={color}
              onChange={() => handleCheckboxChange(color)}
              checked={selectedColors.includes(color)}
            />
            {color}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ColorFilter;
