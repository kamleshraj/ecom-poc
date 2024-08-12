import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedColors } from "../../app/features/products/productSlice";
import styles from './ColorSidebar.module.scss'

export const ColorFilter = () => {
  const dispatch = useDispatch();
  const {selectedColors,products} = useSelector((state) => state.products);
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

  const getColorCount = (color) => {
    return products.filter((product) => product.color === color).length;
  };

  return (
    <div className={styles.colorFilterSidebar}>
      <h6>Select Color:</h6>
      {colors.map((color) => (
        <div className={styles.colorItem} key={color}>
          <input
            type="checkbox"
            value={color}
            onChange={() => handleCheckboxChange(color)}
            checked={selectedColors.includes(color)}
          />
          <div className={styles.colorsBox} style={{ backgroundColor: `${color}` }} />
          <div>
             {color} ({getColorCount(color)})
          </div>
        </div>
      ))}
    </div>
  );
};
