import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedColors } from "../app/features/products/productSlice";
import styled from "styled-components";

const FilteredProductByColorWrapper = styled.div`
  margin-top: 20px;
  .colorItem {
    display: flex;
    align-items: center;
    margin: 10px 0;
    input[type="checkbox"]{z-index:11;opacity:0}
    .colorsBox {
      width: 13px;
      height: 13px;
      display: block;
      border-radius: 3px;
      border: 1px solid #e9e9e9a4;
      position: absolute;
      ::before {
        content: "";
        position: absolute;
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      }
    }
  }
`;

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
    <FilteredProductByColorWrapper>
      <h6>Color</h6>
      {colors.map((color) => (
        <div className="colorItem" key={color}>
          <input
            type="checkbox"
            value={color}
            onChange={() => handleCheckboxChange(color)}
            checked={selectedColors.includes(color)}
          />
          <div className="colorsBox" style={{ backgroundColor: `${color}` }} />
        </div>
      ))}
    </FilteredProductByColorWrapper>
  );
};

export default ColorFilter;
