import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SlHeart } from "react-icons/sl";
import { Link } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { deleteProduct } from "../Redux/favorite/favoriteSlice";
import { Helmet } from "../components";

import styles from './commonStyle.module.scss'

const Favorite = () => {
  const { favoriteList } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Helmet title="Favorite">
      <section className={styles.cartItems}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {favoriteList.length === 0 && (
                <div className="emptyCartItem text-center py-5">
                  <SlHeart
                    className="text-secondary fs-h1"
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
                  <div className={styles.cartItem} key={item.id}>
                    <Row>
                      <Col md={3}>
                        <img
                          src={item.imgUrl}
                          alt={item.productName}
                          className={`img-fluid ${styles.productItemImage}`}
                        />
                      </Col>
                      <Col md={9} className={styles.cartItemDetails}>
                        <h5><Link className={styles.textLink} to={`/shop/${item.id}`}>{item.productName}</Link></h5>
                        <ul className={styles.cartItemList}>
                          <li>${item.price}.00</li>
                        </ul>
                      </Col>
                      <button
                        className={styles.delete}
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
