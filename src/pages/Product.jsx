import {useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Section from "../components/Section";



const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(
    products.filter((item) => parseInt(item.id) === parseInt(id))[0]
  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedProduct(
      products.filter((item) => parseInt(item.id) === parseInt(id))[0]
    );
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === selectedProduct?.category &&
          item.id !== selectedProduct?.id
      )
    );
  }, [selectedProduct, id]);

  useWindowScrollToTop();

  return (
    <>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <Section
        title="Related Products"
        bgColor="#f6f9fc"
        productItems={relatedProducts}
      />
    </>
  );
};

export default Product;
