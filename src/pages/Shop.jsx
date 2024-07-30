import FilterSelect from "../components/FilterSelect";
import { useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import styled from "styled-components";
import CustomBreadcrumbs from "../components/CustomBreadCrumbs/CustomBreadCrumbs";

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
      padding: 15px 30px 45px;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      background-color: #f6f9fc;
    }
  }
`;

const Shop = () => {
  const [filterList, setFilterList] = useState(products);
  useWindowScrollToTop();

  return (
    <>
      {/*<Banner title="product" />
       <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
      </section> */}
      <MainWrapper>
        <CustomBreadcrumbs />
        <div className="innerWrapper">
          <aside className="category-sidebar">
            <h5>Filters</h5>
            <FilterSelect setFilterList={setFilterList} />
          </aside>
          <div className="productsWrapper">
            <ShopList productItems={filterList} />
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

export default Shop;
