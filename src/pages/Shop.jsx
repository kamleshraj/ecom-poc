import FilterSelect from "../components/FilterSelect";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import styled from "styled-components";
import CustomBreadcrumbs from "../components/CustomBreadCrumbs/CustomBreadCrumbs";
import PriceRangeSlider from "../components/PriceRangeSlider";
import { useSelector } from "react-redux";
import { Helmet } from "../components";
import ColorFilter from "../components/ColorFilter";

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


const Shop = () => {
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  
  useWindowScrollToTop();

  
  return (
    <>
    <Helmet title="Shop">
      <MainWrapper>
        <CustomBreadcrumbs />
        <div className="innerWrapper">
          <aside className="category-sidebar">
            <h5>Filters</h5>
            <FilterSelect/>
            <PriceRangeSlider/>
            <div className="filter-product-by-color">
              <h5>Colors</h5>
              <ColorFilter/>
            </div>
          </aside>
          <div
            className={`productsWrapper ${
              filteredProducts.length < 4 ? "card-width" : "null"
            }`}
          >
            <ShopList productItems={filteredProducts} />
          </div>
        </div>
      </MainWrapper>
      </Helmet>
    </>
  );
};

export default Shop;
