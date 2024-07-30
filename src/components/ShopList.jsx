import { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);
  
  if (productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }
  return (
    <>
    {productItems.map((productItem) => {
        return (
          <ProductCard
            key={productItem.id}
            title={null}
            productItem={productItem}
          />
        );
      })}
    </>
  );
};
export default memo(ShopList);
