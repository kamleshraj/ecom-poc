import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SlHeart,SlBasket} from "react-icons/sl";
import { HiArrowsRightLeft} from "react-icons/hi2";
import { addToFavorite } from "../../Redux/favorite/favoriteSlice";
import { addToCompare } from "../../Redux/compare/compareSlice";
import useAuth from "../../hooks/useAuth";
import { CustomModal } from "../CustomModal";
import { addToCart } from "../../Redux/cart/cartSlice";

import styles from "./productDetails.module.scss";

export const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addCartHandler = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
  };
  const addFavoriteHandler=(productItem)=>{
    if (currentUser) {
      dispatch(addToFavorite({ product: productItem, num: 1 }));
    } else {
      handleShowModal();
    }
  }
  const addCompareHandler=(productItem)=>{
    dispatch( addToCompare({ product: productItem, num: 1 }))
  }
  return (
    <>
    <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        description="Please login to add product in favorite!!!"
      />
    <section className={styles.productDetailWrapper}>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={4}>
            <img
              loading="lazy"
              src={selectedProduct?.imgUrl}
              alt={selectedProduct?.title}
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <ul className={styles.productInfo}>
              <li>
                <div className="text-capitalize">
                  {selectedProduct?.category}
                </div>
                <h4>{selectedProduct?.productName}</h4>
              </li>
              <li className={`d-flex align-items-center ${styles.rate}`}>
                <div className={styles.stars}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <span>{selectedProduct?.avgRating} Ratings</span>
              </li>
              <li className="d-flex align-items-center gap-3">
               {<del className="text-secondary">${selectedProduct?.prevPrice}</del>}
               {<h2>${selectedProduct?.price}</h2>}
              </li>
              <li>{selectedProduct?.shortDesc}</li>
              <li className={styles.cartBtn}>
              <Button
                aria-label="Add"
                type="submit"
                variant="btn btn-warning cart-btn text-uppercase d-flex align-items-center gap-1 mt-3 w-50 justify-content-center"
                onClick={() => addCartHandler(selectedProduct)}
              >
              <SlBasket/>  Add To Cart
              </Button>
              </li>
              <li className="d-flex align-items-center gap-3 pt-md-3">
              <Button variant="outline-dark btn-wishlist"
              onClick={() =>addFavoriteHandler(selectedProduct)}
              ><SlHeart/> Add to Wishlist</Button>
              <Button variant="outline-secondary"
              onClick={() => addCompareHandler(selectedProduct)}
              ><HiArrowsRightLeft/> Add to Compare</Button>
              </li>
            </ul>
            
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};
