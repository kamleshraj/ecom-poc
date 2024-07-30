import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductSlider = ({ title, SliderData }) => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Slider {...settings}>
        {SliderData.map((items, index) => 
        <ProductCard title={title} productItem={items} key={index}/>
        )}
      </Slider>
    </>
  );
};

export default ProductSlider;
