import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ProductDetails} from "../components/ProductDetails";
import {ProductReviews} from "../components/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Section from "../components/Section";
import { Helmet } from "../components";
import { useSelector } from "react-redux";
import CustomBreadcrumbs from "../components/CustomBreadCrumbs/CustomBreadCrumbs";



const Product = () => {
  const { id } = useParams();
  const {products} = useSelector((state)=>state.products)
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
  }, [selectedProduct, id,products]);

  useWindowScrollToTop();

  return (
    <>
    <Helmet title="Product Details">
      <CustomBreadcrumbs/>
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <Section
        title="Related Products"
        bgColor="#f6f9fc"
        productItems={relatedProducts}
      />
      </Helmet>
    </>
  );
};

export default Product;
