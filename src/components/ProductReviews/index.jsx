import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import styles from "./Review.module.scss";

export const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");
  return (
    <section className={styles.productReviews}>
      <Container>
        <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link className={listSelected === "desc" ? "active":'text-secondary'}
            onClick={() => setListSelected("desc")}
          >
            Description 
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link className={listSelected === "rev" ? "active":'text-secondary'}
            onClick={() => setListSelected("rev")}
          >
            Reviews 
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="card border-top-0 rounded-0 mb-5">
          <div className="card-body">
          {listSelected === "desc" ? (
          <p className="text-secondary">{selectedProduct?.description}</p>
        ) : (
          <ul className="rates ps-0">
            {selectedProduct?.reviews.map((rate) => (
              <li className="rate-comment" key={rate.rating}>
                <h6 className="mb-0">Jhon Doe</h6>
                <span>{rate.rating} (Rating)</span>
                <p className="text-secondary">{rate.text}</p>
              </li>
            ))}
          </ul>
        )}
          </div>
        </div>
      </Container>
    </section>
  );
};
