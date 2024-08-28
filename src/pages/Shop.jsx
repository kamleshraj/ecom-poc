import { useSelector } from "react-redux";
import FilterSelect from "../components/FilterSelect";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import styled from "styled-components";
import {CustomBreadcrumbs} from "../components/CustomBreadCrumbs";
import {PriceRangeSlider} from "../components/PriceRangeSlider";
import { Helmet } from "../components";
import {ColorFilter} from "../components/ColorFilter";

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
      grid-template-columns: repeat(auto-fit, minmax(200px, 240px));
    }
  }
`;

const Shop = () => {
  const {filteredProducts,products} = useSelector((state) => state.products);
  const isFiltered = filteredProducts && filteredProducts.length > 0;
  useWindowScrollToTop();

  return (
    <>
      <Helmet title="Shop">
        <MainWrapper>
          <CustomBreadcrumbs />
          <div className="innerWrapper">
            <aside className="category-sidebar">
              <h5 className="section-title">Filters by</h5>
              <FilterSelect />
              <PriceRangeSlider />
              <ColorFilter />
            </aside>
            <div
              className={`productsWrapper ${
                filteredProducts.length > 3 ? "null" : "card-width"
              }`}
            >
              <ShopList productItems={isFiltered ? filteredProducts:products} />
            </div>
          </div>
        </MainWrapper>
      </Helmet>
    </>
  );
};

export default Shop;
