import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { addToFavorite } from "../../app/features/favorite/favoriteSlice";
import {
  HiHeart,
  HiOutlineHeart,
  HiMiniShoppingCart,
  HiOutlineShoppingCart,
  HiOutlineEye,
  HiArrowsRightLeft,
} from "react-icons/hi2";
import styles from "./productCard.module.scss";
import useAuth from "../../hooks/useAuth";
import { CustomModal } from "../CustomModal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  addToCompare,
  setOpenModal,
} from "../../app/features/compare/compareSlice";

export const ProductCard = ({ productItem, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const { favoriteList } = useSelector((state) => state.favorite);
  const { compareList } = useSelector((state) => state.compare);
  
  const { currentUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const favoriteProductExit = favoriteList.find(
    (item) => item.id === productItem.id
  );
  const cartProductExit = cartList.find((item) => item.id === productItem.id);

  const handelClick = () => {
    navigate(`/shop/${productItem.id}`);
  };

  const addCartHandler = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    if (cartProductExit) {
      toast.error("Already Product has been added to cart!");
    } else {
      toast.success("Product has been added to cart!");
    }
  };

  const addFavoriteHandler = (productItem) => {
    if (currentUser) {
      dispatch(addToFavorite({ product: productItem, num: 1 }));
      if (favoriteProductExit) {
        toast.error("Already Product has been added to favorite!");
      } else {
        toast.success("Product has been added to favorite!");
      }
    } else {
      handleShowModal();
    }
  };
  const addToCampareHandler = (productItem) => {
    dispatch(addToCompare({ product: productItem, num: 1 }));
    if (compareList.length > 0) {
      dispatch(setOpenModal(true));
    }
  };
  return (
    <>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        title="User Authentication"
        description="Please login to add product in favorite!!!"
      />

      <div className={styles.productWrapper}>
        {title === "Big Discount" ? (
          <span className={styles.discount}>{productItem.discount}% Off</span>
        ) : null}
        <img
          loading="lazy"
          onClick={() => handelClick()}
          className={`img-fluid ${styles.img}`}
          src={productItem.imgUrl}
          alt={productItem.title}
        />
        <div className={styles.productIcon}>
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
            onClick={() => {
              addFavoriteHandler(productItem);
            }}
          >
            {favoriteProductExit ? (
              <HiHeart style={{ color: "#ff5533" }} />
            ) : (
              <HiOutlineHeart />
            )}
          </button>
          <button onClick={() => handelClick()}>
            <HiOutlineEye />
          </button>
        </div>
        <div className={styles.productDetails}>
          <p className={styles.productTitle} onClick={() => handelClick()}>
            {productItem.productName}
          </p>
          <div className={styles.ratingReviewCount}>
            <div className={styles.rate}>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
            <div className={styles.ratingCount}>{productItem.avgRating}</div>
          </div>
          <div className={styles.price}>
            {productItem.prevPrice ? (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <del>${productItem.prevPrice}</del>
                <h4>${productItem.price}</h4>
              </div>
            ) : (
              <h4>${productItem.price}</h4>
            )}
          </div>
          <Button
            variant="outline-secondary btn-compare"
            onClick={() => addToCampareHandler(productItem)}
          >
            <HiArrowsRightLeft /> Compare
          </Button>
        </div>
      </div>
    </>
  );
};
