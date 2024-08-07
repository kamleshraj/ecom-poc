import { memo } from "react";
import {ProductCard} from "./ProductCard";

const ShopList = ({ productItems }) => {
  if (productItems.length === 0) {
    return <h4 className="not-found">Product Not Found !!</h4>;
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
