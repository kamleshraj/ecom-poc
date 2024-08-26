import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import { SliderData } from "../../db/data";
import { Link } from "react-router-dom";
import styles from "./homeBannerSlider.module.scss";

export const HomeBannerSlider = () => {
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <section className={styles.homeBannerWrapper}>
      <Container>
            <Slider {...settings}>
              {SliderData.map((value, index) => {
                return (
                  <div key={index} className={`${styles.homeBannerInner} d-flex align-items-center justify-content-space-between text-white`}>
                    <div className={styles.bannerInfo} key={index}>
                      <h1>{value.title}</h1>
                      <p>{value.desc}</p>
                      <Link to="/shop" className="btn btn-primary">
                        Shop Now
                      </Link>
                    </div>
                    <div className={`${styles.bannerImg} d-none d-md-block`}>
                      <img src={value.cover} alt="banner" className="fluid"/>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </Container>
    </section>
  );
};
