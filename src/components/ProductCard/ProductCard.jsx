import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { addToFavorite } from "../../app/features/favorite/favoriteSlice";
import { HiHeart,HiOutlineHeart, HiMiniShoppingCart,HiOutlineShoppingCart,HiOutlineEye } from "react-icons/hi2";
import "./productCard.scss";

const ProductCard = ({ productItem, title }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const { cartList,isLoggedIn} = useSelector((state) => state.cart);
  const { favoriteList } = useSelector((state) => state.favorite);

  const favoriteProductExit = favoriteList.find(
    (item) => item.id === productItem.id
  );

  const cartProductExit = cartList.find((item) => item.id === productItem.id);

  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };

  
  const addCartHandler = (productItem) => {
    if (!isLoggedIn) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }
    dispatch(addToCart({ product: productItem, num: 1 }));
    if (cartProductExit) {
      toast.error("Already Product has been added to cart!");
    } else {
      toast.success("Product has been added to cart!");
    }
  };

  const addFavoriteHandler = (productItem) => {
    if (!isLoggedIn) {
      toast.error("You need to be logged in to add items to the favorite!");
      return;
    }
    dispatch(addToFavorite({ product: productItem, num: 1 }));
    if (favoriteProductExit) {
      toast.error("Already Product has been added to favorite!");
    } else {
      toast.success("Product has been added to favorite!");
    }
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
          onClick={() => addCartHandler(productItem)}
        >
          {cartProductExit ? (
            <HiMiniShoppingCart style={{ color: "#ff5533" }} />
          ) : (
            <HiOutlineShoppingCart />
          )}
        </button>

        <button
          aria-label="Add Favorite"
          type="submit"
          onClick={() => addFavoriteHandler(productItem)}
        >
          {favoriteProductExit ? (
            <HiHeart style={{ color: "#ff5533" }} />
          ) : (
            <HiOutlineHeart/>
          )}
        </button>
        <button onClick={() => handelClick()}>
          <HiOutlineEye />
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
          {productItem.prevPrice ? (
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <del>${productItem.prevPrice}</del> <h4>${productItem.price}</h4>
            </div>
          ) : (
            <h4>${productItem.price}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
