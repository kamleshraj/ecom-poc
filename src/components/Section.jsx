import styled from "styled-components";
import ProductSlider from "./ProductSlider/ProductSlider";

const SectionTitle = styled.div`
padding: 40px 0 15px 30px;
h1{
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: 700;
  }
`;
const ProductWrapper = styled.div`
  padding:0 30px 65px 30px;
`;

const Section = ({ title, bgColor, productItems }) => {
  console.log(productItems);
  return (
    <section style={{ background: bgColor }}>
      <SectionTitle>
        <h1>{title}</h1>
      </SectionTitle>
      <ProductWrapper>
        <ProductSlider SliderData={productItems} title={title}/>
      </ProductWrapper>
    </section>
  );
};

export default Section;
