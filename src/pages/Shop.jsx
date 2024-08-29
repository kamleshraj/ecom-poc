import { useSelector } from "react-redux";
import FilterSelect from "../components/FilterSelect";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import {CustomBreadcrumbs} from "../components/CustomBreadCrumbs";
import {PriceRangeSlider} from "../components/PriceRangeSlider";
import { Helmet } from "../components";
import {ColorFilter} from "../components/ColorFilter";

import styles from '../pages/commonStyle.module.scss'

const Shop = () => {
  const {filteredProducts,products} = useSelector((state) => state.products);
  const isFiltered = filteredProducts && filteredProducts.length > 0;
  useWindowScrollToTop();

  return (
    <>
      <Helmet title="Shop">
        <section className={styles.shopWrapper}>
          <CustomBreadcrumbs />
          <div className={styles.innerWrapper}>
            <aside className={styles.categorySidebar}>
              <h5 className={styles.sectionTitle}>Filters by</h5>
              <FilterSelect />
              <PriceRangeSlider />
              <ColorFilter />
            </aside>
            <div
              className={`${styles.productsWrapper} ${
                filteredProducts.length > 3 ? "null" : "cardWidth"
              }`}
            >
              <ShopList productItems={isFiltered ? filteredProducts:products} />
            </div>
          </div>
        </section>
      </Helmet>
    </>
  );
};

export default Shop;
