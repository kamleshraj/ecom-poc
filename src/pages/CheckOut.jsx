import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Helmet } from "../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SlPlus } from "react-icons/sl";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const CheckOut = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const { cartList } = useSelector((state) => state.cart);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    mobile: "",
    streetAddress: "",
    zip: "",
    city: "",
    state: "",
  });
  const { currentUser } = useAuth();
  const inputHandler = (e) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (currentUser && currentUser.email) {
      const storedAddresses =
        JSON.parse(localStorage.getItem(`addressInfo_${currentUser.email}`)) ||
        [];
      storedAddresses.push(addressInfo);
      localStorage.setItem(
        `addressInfo_${currentUser.email}`,
        JSON.stringify(storedAddresses)
      );
      toast.success("Address saved");
      setToggleForm(false);
      setAddressInfo({
        name: "",
        mobile: "",
        streetAddress: "",
        zip: "",
        city: "",
        state: "",
      });
    }
  };

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const newAddressHandler = () => {
    setToggleForm(true);
  };
  const cancelHandler = () => {
    setToggleForm(false);
  };
  useEffect(() => {
    if (currentUser && currentUser.email) {
      const storedAddresses =
        JSON.parse(localStorage.getItem(`addressInfo_${currentUser.email}`)) ||
        [];
      if (storedAddresses && storedAddresses.length >=0) {
        setSavedAddresses(storedAddresses);
        setSelectedAddressIndex(0);
      }
    }
  }, [currentUser]);

  const handleAddressChange = (index) => {
    setSelectedAddressIndex(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet title="Checkout">
        <section className="cart-items py-lg-4">
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="border-0 shadow-sm p-3">
                  <CardBody>
                    <h6 className="card-title pb-3">Delivery Address</h6>
                    <Card>
                      <CardBody>
                        {!toggleForm && (
                          <Link
                            className="d-flex align-items-center gap-2 text-decoration-none cursor-pointer"
                            onClick={newAddressHandler}
                          >
                            <SlPlus /> <label>Add New Address</label>
                          </Link>
                        )}
                        {toggleForm && (
                          <>
                            <h6 className="card-title pb-2">New Address</h6>
                            <Form onSubmit={submitHandler}>
                              <Row className="g-3 mb-3">
                                <Col>
                                  <FloatingLabel
                                    controlId="floatingInputGrid1"
                                    label="Name"
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="Name"
                                      name="name"
                                      value={addressInfo.name}
                                      onChange={inputHandler}
                                    />
                                  </FloatingLabel>
                                </Col>
                                <Col>
                                  <FloatingLabel
                                    controlId="floatingInputGrid3"
                                    label="Mobile Number"
                                  >
                                    <Form.Control
                                      type="number"
                                      placeholder="Mobile Number"
                                      name="mobile"
                                      value={addressInfo.mobile}
                                      onChange={inputHandler}
                                    />
                                  </FloatingLabel>
                                </Col>
                              </Row>
                              <Row className="g-3 mb-3">
                                <Col>
                                  <FloatingLabel
                                    controlId="floatingInputGrid2"
                                    label="Street Address"
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="Street Address"
                                      name="streetAddress"
                                      value={addressInfo.streetAddress}
                                      onChange={inputHandler}
                                    />
                                  </FloatingLabel>
                                </Col>
                              </Row>
                              <Row className="g-3 mb-3">
                                <Col md>
                                  <FloatingLabel
                                    controlId="floatingInputGrid3"
                                    label="Zip"
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="Zip"
                                      name="zip"
                                      value={addressInfo.zip}
                                      onChange={inputHandler}
                                    />
                                  </FloatingLabel>
                                </Col>
                                <Col md>
                                  <FloatingLabel
                                    controlId="floatingInputGrid1"
                                    label="City"
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="City"
                                      name="city"
                                      value={addressInfo.city}
                                      onChange={inputHandler}
                                    />
                                  </FloatingLabel>
                                </Col>
                                <Col md>
                                  <FloatingLabel
                                    controlId="floatingInputGrid1"
                                    label="State"
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="State"
                                      name="state"
                                      value={addressInfo.state}
                                      onChange={inputHandler}
                                    />
                                  </FloatingLabel>
                                </Col>
                              </Row>
                              <Row className="mt-4">
                                <Col className="d-flex align-items-center justify-content-between">
                                  <Button
                                    variant="outline-secondary w-25"
                                    onClick={cancelHandler}
                                  >
                                    Cancel
                                  </Button>
                                  <Button type="submit" variant="primary px-3">
                                    Save Delivery Address
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </>
                        )}
                      </CardBody>
                    </Card>
                    <ul className="list-group list-group-flush pt-2">
                      {savedAddresses.map((address, index) => (
                        <li key={index} className="py-2">
                          <label>
                            <input
                              type="radio"
                              name="address"
                              value={index}
                              checked={selectedAddressIndex === index}
                              onChange={() => handleAddressChange(index)}
                              className="me-2"
                            />
                            {address.name}, {address.streetAddress},{" "}
                            {address.city}, {address.state}, {address.zip},{" "}
                            {address.mobile}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
              {cartList.length !== 0 && (
                <Col md={4}>
                  <div className="cart-total card border-0 shadow-sm">
                    <h4 className="summary-title">Order Summary</h4>
                    <ul className="summaryInfo">
                      <li>
                        Subtotal<div>${totalPrice}</div>
                      </li>
                      <li>
                        Shipping<div className="text-success">Free</div>
                      </li>
                      <li className="totalPrice">
                        Total<h4>${totalPrice}.00</h4>
                      </li>
                      <li>
                        <Link to="/checkout" className="btn btn-warning">
                          Place Order
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default CheckOut;
