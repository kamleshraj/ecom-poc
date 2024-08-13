import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../app/features/favorite/favoriteSlice";
import { Helmet } from "../components";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";

const Favorite = () => {
  const { favoriteList } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Helmet title="Favorite">
      <section className="cart-items pt-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {favoriteList.length === 0 && (
                <div className="empty-cart-item text-center py-5">
                  <SlBasket
                    style={{ fontSize: "3rem" }}
                    className="text-secondary"
                  />
                  <h4 className="text-secondary py-2">
                    Your favorite list is currently empty!
                  </h4>
                  <Link to="/shop" className="btn btn-primary">
                    Return Shop
                  </Link>
                </div>
              )}
              {favoriteList.map((item) => {
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
                        </ul>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => dispatch(deleteProduct(item))}
                      >
                        <HiXMark/>
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Favorite;
