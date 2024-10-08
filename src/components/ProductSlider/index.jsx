import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ProductCard} from "../ProductCard";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

export const ProductSlider = ({ title, SliderData }) => {
  const {isLoading} = useSelector((state)=>state.products)
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {SliderData.map((items, index) =>{
         return(
          <div key={index} >
            {isLoading ? (
              <div className="product-wrapper">
                <Skeleton height={100} style={{ marginBottom: '40px' }} />
                <Skeleton height={20} style={{ marginBottom: '20px' }} />
                <Skeleton width={110} height={20} style={{ marginBottom: '20px' }} />
                <Skeleton height={30} style={{ marginBottom: '50px' }}/>
                <Skeleton height={20} />
              </div>
            ):
            <ProductCard title={title} productItem={items} key={index}/>
            }
            
          </div>
         )
        })}
      </Slider>
    </>
  );
};