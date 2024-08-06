import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products } from "../utils/products";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import {HomeBannerSlider} from "../components/HomeBannerSlider";
import { Helmet } from "../components";

const Home = () => {
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  const discountProducts = products.filter((item) => item.discount > 0);
  useWindowScrollToTop();

  return (
    <>
    <Helmet title="Home">
      <HomeBannerSlider />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discountProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Wrapper />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
      </Helmet>
    </>
  );
};

export default Home;
