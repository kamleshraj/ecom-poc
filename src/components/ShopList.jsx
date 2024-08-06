import { memo } from "react";
import {ProductCard} from "./ProductCard";

const ShopList = ({ productItems }) => {
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
