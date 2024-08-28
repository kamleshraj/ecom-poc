import { useState } from "react";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlHandbag, SlUser, SlBasket, SlHeart, SlGrid } from "react-icons/sl";
import { SearchBar } from "../SearchBar";
import useAuth from "../../hooks/useAuth";
import styles from "./Navbar.module.scss";

export const CustomNavbar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { favoriteList } = useSelector((state) => state.favorite);
  const [isFixed, setIsFixed] = useState(false);
  const { currentUser, Logout } = useAuth();

  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);
  return (
    <Navbar
      expand="md"
      className={`${styles.navbar} ${isFixed ? styles.fixedNavbar : ""}`}
    >
      <Container fluid>
        <Navbar.Brand className={styles.navLinkLogo}>
          <Link
            to="/"
            className={`${styles.myLogo} d-flex align-items-center gap-2`}
          >
            <SlHandbag className={styles.logoIcon} />
            <h1 className={`${styles.logo} fw-bolder`}>
              Multi Shop
              <div className={styles.logoCaption}>Big Mega Store</div>
            </h1>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className={`${styles.navbarLinkItem} ms-lg-5 me-auto navbarScroll`}
          >
            <NavDropdown
              title={
                <>
                  <SlGrid />
                  <span className={`${styles.navLinkLabel} ps-1`}>
                    Category
                  </span>
                </>
              }
              id="mega-menu-dropdown"
            >
              <div className={styles.dropdownMenu}>
                <Container>
                  <Row>
                    <Col md={4}>
                      <h6>Category 1</h6>
                      <Nav className="flex-column">
                        <Link to="/">Product 1</Link>
                        <Link to="/">Product 2</Link>
                        <Link to="/">Product 3</Link>
                      </Nav>
                    </Col>
                    <Col md={4}>
                      <h6>Category 2</h6>
                      <Nav className="flex-column">
                        <Link to="/">Product 4</Link>
                        <Link to="/">Product 5</Link>
                        <Link to="/">Product 6</Link>
                      </Nav>
                    </Col>
                    <Col md={4}>
                      <h6>Category 3</h6>
                      <Nav className="flex-column">
                        <Link to="/">Product 7</Link>
                        <Link to="/">Product 8</Link>
                        <Link to="/">Product 9</Link>
                      </Nav>
                    </Col>
                  </Row>
                </Container>
              </div>
            </NavDropdown>
            <Nav.Item>
              <Link
                aria-label="Go to Products Page"
                className={styles.navbarLink}
                to="/shop"
              >
                <span className={styles.navLinkLabel}>Shop</span>
              </Link>
            </Nav.Item>
          </Nav>
          <div className="d-flex justify-content-center flex-grow-1">
            <SearchBar />
          </div>
          <div className={styles.navLinkIconWrapper}>
            <Nav className="ms-auto gap-md-3 d-flex align-items-center">
              {currentUser ? (
                <NavDropdown
                  id="user-logout"
                  title={
                    <>
                      <div className="fs-6 fw-lighter">Welcome</div>{" "}
                      <label className="fw-bold">
                        {currentUser.displayName}
                      </label>
                    </>
                  }
                >
                  <NavDropdown.Item className={styles.navItem}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={Logout}
                    className={styles.navbarLink}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Link
                    to="/login"
                    className={`${styles.navbarLink} btn btn-primary text-white d-flex align-items-center p-1 px-2 gap-1`}
                  >
                    <SlUser /> Login
                  </Link>
                </Nav.Item>
              )}
              <div className="vr text-secondary" />
              <Nav.Item className="position-relative">
                <Link
                  aria-label="Go to Cart Page"
                  to="/cart"
                  className={styles.navbarLink}
                >
                  {cartList.length !== 0 && (
                    <span className={styles.cartCountBadge}>
                      <span className="">{cartList.length}</span>
                    </span>
                  )}
                  <SlBasket />
                </Link>
              </Nav.Item>
              <div className="vr text-secondary" />
              <Nav.Item className="position-relative">
                <Link
                  aria-label="Go to Favorite Page"
                  to="/favorite"
                  className={styles.navbarLink}
                >
                  {favoriteList.length !== 0 && (
                    <span className={styles.cartCountBadge}>
                      <span className="">{favoriteList.length}</span>
                    </span>
                  )}
                  <SlHeart />
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
