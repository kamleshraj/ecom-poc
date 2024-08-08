import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlHandbag, SlUser, SlBasket, SlHeart, SlGrid } from "react-icons/sl";
import { SearchBar } from "../SearchBar";
import useAuth from "../../hooks/useAuth";
import styles from './Navbar-module.scss';

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
    // <Navbar expand="md" className={isFixed ? `${styles.navbar} ${styles.fixedNavbar}` : styles.navbar}>
    <Navbar expand="md" className={isFixed ? `navbar fixedNavbar` : styles.navbar}>
      <Container fluid>
          
          {/* Left side: Logo and Links */}
          <div className="d-flex align-items-center navLinkLogo">
            <Navbar.Brand>
              <Link to="/" className="my-logo d-flex align-items-center gap-2">
                <SlHandbag className="logo-icon" />
                <h1 className="logo fw-bolder ">
                  Multi Shop
                  <div className="logo-caption">Big Mega Store</div>
                </h1>
              </Link>
            </Navbar.Brand>
            <Nav className="ms-3 navbar-link-item">
              <Nav.Item>
                <Link aria-label="category page" className="navbar-link" to="/">
                  <SlGrid/>
                  <span className="nav-link-label ps-1">Category</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link aria-label="Go to Products Page" className="navbar-link" to="/shop">
                  <span className="nav-link-label">Shop</span>
                </Link>
              </Nav.Item>
            </Nav>
          </div>

          {/* Center: Search Bar */}
          <div className="d-flex justify-content-center flex-grow-1">
            <SearchBar />
          </div>

          {/* Right side: Icons */}
          <div className="d-flex align-items-center nav-link-iconWrapper">
            <Nav className="ms-auto">
              {currentUser ? (
                <Nav.Item>
                  <Link onClick={Logout} className="navbar-link">
                    <SlUser /> Logout
                  </Link>
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <Link to="/login" className="navbar-link btn btn-primary text-white d-flex align-items-center p-1 px-2 gap-1">
                    <SlUser/> Login
                  </Link>
                </Nav.Item>
              )}
              <Nav.Item className="position-relative">
                <Link aria-label="Go to Cart Page" to="/cart" className="navbar-link">
                  {cartList.length !== 0 && (
                    <span className="cart-count-badge">
                      <span className="">{cartList.length}</span>
                    </span>
                  )}
                  <SlBasket />
                </Link>
              </Nav.Item>
              <Nav.Item className="position-relative">
                <Link aria-label="Go to Favorite Page" to="/favorite" className="navbar-link">
                  {favoriteList.length !== 0 && (
                    <span className="cart-count-badge">
                      <span className="">{favoriteList.length}</span>
                    </span>
                  )}
                  <SlHeart />
                </Link>
              </Nav.Item>
            </Nav>
          </div>
      </Container>
    </Navbar>
  );
};
