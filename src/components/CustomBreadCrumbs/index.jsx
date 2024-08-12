import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { IoMdHome } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import styles from "./BreadCum.module.scss";
import { useSelector } from "react-redux";

export const CustomBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const {products} = useSelector((state)=>state.products)
  const getProductName = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.productName : id;
  };
  return (
    <div className={`${styles.breadCumWrapper}`}>
      <Container fluid>
      <Breadcrumb>
          <Link to="/" className="breadcrumb-item">
            <IoMdHome />
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isProduct = !isNaN(value); // Assuming product IDs are numeric
            const displayValue = isProduct ? getProductName(value) : value;

            return (
              <Breadcrumb.Item key={to} linkAs={Link} linkProps={{ to }}>
                {displayValue}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </Container>
    </div>
  );
};
