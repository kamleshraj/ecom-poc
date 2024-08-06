import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct} from "../app/features/favorite/favoriteSlice";
import { Helmet } from "../components";

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
              <h1 className="no-items product">No Items are add in Favorite!</h1>
            )}
            {favoriteList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span>
                          </h4>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
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
