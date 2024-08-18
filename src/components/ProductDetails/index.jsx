import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../Redux/cart/cartSlice";
import { SlHeart,SlBasket} from "react-icons/sl";
import styles from "./productDetails.module.scss";

export const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const addCartHandler = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className={styles.productDetailWrapper}>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={4}>
            <img
              loading="lazy"
              src={selectedProduct?.imgUrl}
              alt={selectedProduct.title}
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
               {<del className="text-secondary">${selectedProduct.prevPrice}</del>}
               {<h2>${selectedProduct?.price}</h2>}
              </li>
              <li>{selectedProduct?.description}</li>
            </ul>
            <div className={styles.btnLists}>
              <Button
                aria-label="Add"
                type="submit"
                variant="btn btn-warning btn-cart d-flex align-items-center gap-1"
                onClick={() => addCartHandler(selectedProduct)}
              >
              <SlBasket/>  Add To Cart
              </Button>
              <Button variant="outline-secondary btn-wishlist"><SlHeart/> Wishlist</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
