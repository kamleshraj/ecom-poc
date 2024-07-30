import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { SlHeart, SlEye, SlBasket } from "react-icons/sl";
import './productCard.scss'

const ProductCard = ({ productItem,title }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };
  const handleAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };
  return (
    <div className="product-wrapper">
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imgUrl}
        alt={productItem.title}
      />
      <div className="product-icon">
        <button
          aria-label="Add"
          type="submit"
          onClick={() => handleAdd(productItem)}
        >
          <SlBasket />
        </button>
        <button>
          <SlHeart />
        </button>
        <button onClick={() => handelClick()}>
          <SlEye />
        </button>
      </div>
      <div className="product-details">
        <p className="product-title" onClick={() => handelClick()}>
          {productItem.productName}
        </p>
        <div className="rating-review-count">
          <div className="rate">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <div className="rating-count">{productItem.avgRating}</div>
        </div>
        <div className="price">
          {productItem.prevPrice?
          (<div style={{display:'flex',gap:'10px', alignItems:'center',justifyContent:'center'}}><del>${productItem.prevPrice}</del> <h4>${productItem.price}</h4></div>):
          <h4>${productItem.price}</h4>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
