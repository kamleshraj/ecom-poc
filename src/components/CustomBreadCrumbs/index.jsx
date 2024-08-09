import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { IoMdHome } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import styles from "./BreadCum.module.scss";

export const CustomBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className={`${styles.breadCumWrapper}`}>
      <Container fluid>
        <Breadcrumb className="">
          <Link to="/" className="breadcrumb-item">
            <IoMdHome />
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <Breadcrumb.Item key={to} linkAs={Link} linkProps={{ to }}>
                {value}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </Container>
    </div>
  );
};
