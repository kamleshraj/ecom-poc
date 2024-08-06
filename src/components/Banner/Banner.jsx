import { Col, Container, Row } from "react-bootstrap";
import productBg from "../../Images/table.jpg";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      color: white;
      font-size: 30px;
      text-align: center;
    }
  }
`;

const Banner = ({ title }) => {
  return (
    <ImageContainer>
      <img src={productBg} alt="Product-bg" />
      <div className="overlay">
        <Container>
          <Row>
            <Col>
              <h2>{title}</h2>
            </Col>
          </Row>
        </Container>
      </div>
    </ImageContainer>
  );
};

export default Banner;
