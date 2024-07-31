import FilterSelect from "../components/FilterSelect";
import { useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import styled from "styled-components";
import CustomBreadcrumbs from "../components/CustomBreadCrumbs/CustomBreadCrumbs";
import PriceRangeSlider from "../components/PriceRangeSlider";
import { useSelector } from "react-redux";

const MainWrapper = styled.div`
  position: relative;
  .innerWrapper {
    display: flex;
    justify-content: center;
    .category-sidebar {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      align-self: flex-start;
      padding: 1rem;
      flex: 2;
      display: flex;
      flex-direction: column;
    }
    .productsWrapper {
      flex: 8;
      display: grid;
      gap: 15px;
      padding: 30px 30px 45px;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      background-color: #f6f9fc;
    }
    .card-width {
      grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
    }
  }
`;
const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

const Shop = ({ filterList, setFilterList }) => {
  const products = useSelector((state) => state.cart.products);
  const [selectedColors, setSelectedColors] = useState([]);
  useWindowScrollToTop();

  const handleCheckboxChange = (color) => {
    let updatedColors;
    if (selectedColors.includes(color)) {
      updatedColors = selectedColors.filter((c) => c !== color);
    } else {
      updatedColors = [...selectedColors, color];
    }
    setSelectedColors(updatedColors);
  };

  useEffect(() => {
    if (selectedColors.length === 0) {
      setFilterList(products);
    } else {
      const filteredProducts = products.filter((product) =>
        selectedColors.includes(product.color)
      );
      setFilterList(filteredProducts);
    }
  }, [selectedColors, setFilterList, products]);
  return (
    <>
      <MainWrapper>
        <CustomBreadcrumbs />
        <div className="innerWrapper">
          <aside className="category-sidebar">
            <h5>Filters</h5>
            <FilterSelect setFilterList={setFilterList} />
            <PriceRangeSlider
              setFilterList={setFilterList}
              products={products}
            />
            <div className="filter-product-by-color">
              <h5>Colors</h5>
              {colors.map((color) => (
                <div key={color}>
                  <label>
                    <input
                      type="checkbox"
                      value={color}
                      onChange={() => handleCheckboxChange(color)}
                    />
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </aside>
          <div
            className={`productsWrapper ${
              filterList.length < 4 ? "card-width" : "null"
            }`}
          >
            <ShopList productItems={filterList} />
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

export default Shop;
