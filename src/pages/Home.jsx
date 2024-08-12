import Section from "../components/Section";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import {HomeBannerSlider} from "../components/HomeBannerSlider";
import { Helmet } from "../components";
import Services from "../components/ServicesWrapper/Services";
import { useSelector } from "react-redux";

const Home = () => {
  const {products} = useSelector((state)=>state.products)
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
      <Services/>
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
      </Helmet>
    </>
  );
};

export default Home;
