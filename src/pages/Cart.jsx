import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { Helmet } from "../components";
import { SlBasket } from "react-icons/sl";
import { HiXMark } from "react-icons/hi2";
const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Helmet title="Cart">
      <section className="cart-items pt-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {cartList.length === 0 && (
                <div className="empty-cart-item text-center py-5">
                  <SlBasket
                    style={{ fontSize: "3rem" }}
                    className="text-secondary"
                  />
                  <h4 className="text-secondary py-2">
                    Your cart is currently empty!
                  </h4>
                  <Link to="/shop" className="btn btn-primary">
                    Return Shop
                  </Link>
                </div>
              )}
              {cartList.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-item shadow-sm mb-3" key={item.id}>
                    <Row>
                      <Col md={3}>
                        <img
                          src={item.imgUrl}
                          alt={item.productName}
                          className="img-fluid product-item-image"
                        />
                      </Col>
                      <Col md={9} className="cart-item-details">
                        <h5>{item.productName}</h5>
                        <ul className="cart-item-list mb-0">
                          <li>${item.price}.00</li>
                          <li className="cartControl">
                            <button
                              className="incCart"
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            {item.qty}
                            <button
                              className="incCart"
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </li>
                          <li>
                            <h5>${productQty}.00</h5>
                          </li>
                        </ul>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => dispatch(deleteProduct(item))}
                      >
                        <HiXMark />
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>
            {cartList.length !== 0 && (
              <Col md={4}>
                <div className="cart-total card border-0 shadow-sm">
                  <h4 className="summary-title">Order Summary</h4>
                  <ul className="summaryInfo">
                    <li>
                      Subtotal<div>${totalPrice}</div>
                    </li>
                    <li>
                      Shipping<div className="text-success">Free</div>
                    </li>
                    <li className="totalPrice">
                      Total<h4>${totalPrice}.00</h4>
                    </li>
                    <li>
                      <Link to="/checkout" className="btn btn-warning fw-600">
                        Proceed to Buy
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
