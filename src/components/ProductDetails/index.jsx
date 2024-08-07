import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import { SlBasket} from "react-icons/sl";
import "./productDetails-module.scss";

export const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const handelAdd = (selectedProduct) => {
    dispatch(addToCart({ product: selectedProduct }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="productDetailWrapper">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={6}>
            <img
              loading="lazy"
              src={selectedProduct?.imgUrl}
              alt={selectedProduct.title}
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <ul className="product-info">
              <li>
                <div className="text-capitalize">
                  {selectedProduct?.category}
                </div>
                <h4>{selectedProduct?.productName}</h4>
              </li>
              <li className="rate">
                <div className="stars">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <span>{selectedProduct?.avgRating} ratings</span>
              </li>
              <li className="d-flex align-items-center gap-3">
               {<del className="text-secondary">{selectedProduct.prevPrice}</del>}
               {<h2>${selectedProduct?.price}</h2>}
              </li>
              <li>{selectedProduct?.description}</li>
            </ul>
            <div className="btn-lists">
              <button
                aria-label="Add"
                type="submit"
                className="btn btn-warning d-flex align-items-center gap-1"
                onClick={() => handelAdd(selectedProduct)}
              >
              <SlBasket/>  Add To Cart
              </button>
              <button className="btn btn-danger">Buy Now</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
