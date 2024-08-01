import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlHandbag, SlUser, SlBasket, SlHeart, SlGrid } from "react-icons/sl";
import SearchBar from "../SeachBar/SearchBar";

const NavBar = ({ setFilterList }) => {
  const { cartList } = useSelector((state) => state.cart);
  const { favoriteList } = useSelector((state) => state.favorite);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  console.log(expand);
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);
  return (
    <Navbar expand="md" className={isFixed ? "navbar fixedNavbar" : "navbar"}>
      <Container fluid className="navbar-container">
        <Navbar.Brand>
          <Link to="/" className="my-logo d-flex align-items-center gap-2">
            <SlHandbag className="logo-icon" />
            <h1 className="logo fw-bolder ">
              Multi Shop
              <div className="logo-caption">Big Mega Store</div>
            </h1>
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-with-search d-flex justify-content-between align-items-center flex-grow-1 ps-md-5">
            <SearchBar setFilterList={setFilterList} />
            <Nav className="justify-content-end">
              <Nav.Item>
                <Link
                  aria-label="category page"
                  className="navbar-link"
                  to="/"
                  onClick={() => setExpand(false)}
                >
                  <SlGrid className="fs-6" />
                  <span className="nav-link-label ps-1">Category</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  aria-label="Go to Home Page"
                  className="navbar-link"
                  to="/"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Home</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  aria-label="Go to Products Page"
                  className="navbar-link"
                  to="/shop"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Shop</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/login">
                  <SlUser />
                </Link>
              </Nav.Item>
              <Nav.Item className="expanded-cart position-relative">
                <Link aria-label="Go to Cart Page" to="/cart">
                  {cartList.length !== 0 && (
                    <span className="cart-count-badge">
                      <span className="">{cartList.length}</span>
                    </span>
                  )}
                  <SlBasket />
                </Link>
              </Nav.Item>
              <Nav.Item className="expanded-cart position-relative">
                <Link aria-label="Go to Favorite Page" to="/favorite">
                  {favoriteList.length !==0 && <span className="cart-count-badge">
                  <span className="">{favoriteList.length}</span>
                </span>}
                  <SlHeart />
                </Link>
              </Nav.Item>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
