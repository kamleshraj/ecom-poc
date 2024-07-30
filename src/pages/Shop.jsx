import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import styled from "styled-components";
import CustomBreadcrumbs from "../components/breadCum/breadCum";

const MainWrapper=styled.div`
position: relative;
.innerWrapper{
  display: flex;
  justify-content: center;
  .category-sidebar{
    flex:2;
    border-right:1px solid #e9e9e9;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .productsWrapper{
    flex: 8;
    display: grid;
    gap: 15px;
    padding:15px 30px 45px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
      <CustomBreadcrumbs/>
        <div className="innerWrapper">
          <aside className="category-sidebar">
            <h4>Filters</h4>
            <FilterSelect setFilterList={setFilterList} />
          </aside>
          <div className="productsWrapper">
            <ShopList productItems={filterList}/>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

export default Shop;
