import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CompareModal from "../compareModal";
import { setOpenModal } from "../../Redux/compare/compareSlice";
import styles from './FooterStyle.module.scss'
import { SlHandbag} from "react-icons/sl";

const Footer = () => {
  const { compareList, isOpenModal } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  useEffect(() => {
    if (compareList.length > 0) {
      dispatch(setOpenModal(true));
    }else{
      dispatch(setOpenModal(false));
    }
  }, [compareList, dispatch]);
  return (
    <>
      {isOpenModal && <CompareModal />}
      <footer className={styles.footer}>
        <Container fluid>
          <Row className="footer-row">
            <Col md={3} sm={5} className="box">
              <div className={styles.logo}>
                <SlHandbag/>
                <h1 className={styles.logo.h1}>
                  Multi Shop
                  <div className={styles.logoCaption}>Big Mega Store</div>
                </h1>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                libero id et, in gravida. Sit diam duis mauris nulla cursus.
                Erat et lectus vel ut sollicitudin elit at amet.
              </p>
            </Col>
            <Col md={3} sm={5} className="box">
              <h2>About Us</h2>
              <ul>
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className="box">
              <h2>Customer Care</h2>
              <ul>
                <li>Help Center </li>
                <li>How to Buy </li>
                <li>Track Your Order </li>
                <li>Corporate & Bulk Purchasing </li>
                <li>Returns & Refunds </li>
              </ul>
            </Col>
            <Col md={3} sm={5} className="box">
              <h2>Contact Us</h2>
              <ul>
                <li>Symphony IT Park, Pune, Maharashtra 411024, IN</li>
                <li>Email: multishopInfo@gmail.com</li>
                <li>Phone: +1 1123 456 780</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
