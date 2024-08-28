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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SlPlus } from "react-icons/sl";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { Helmet } from "../components";
import useAuth from "../hooks/useAuth";

const CheckOut = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const { cartList } = useSelector((state) => state.cart);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const initialFormValue = {
    name: "",
    mobile: "",
    streetAddress: "",
    zip: "",
    city: "",
    state: "",
  };
  const { currentUser } = useAuth();

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
      if (storedAddresses && storedAddresses.length >= 0) {
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

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number should be number and 10 digit"),
    streetAddress: Yup.string().required("Street Address is required"),
    zip: Yup.string()
      .required("Zip code is required")
      .matches(/^[0-9]{6}$/, "Zip code should be number and 6 digit"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  const handleAddressSubmit = (values, { resetForm }) => {
    if (currentUser && currentUser.email) {
      const storedAddresses =
        JSON.parse(localStorage.getItem(`addressInfo_${currentUser.email}`)) ||
        [];
      storedAddresses.push(values);
      localStorage.setItem(
        `addressInfo_${currentUser.email}`,
        JSON.stringify(storedAddresses)
      );
      setSavedAddresses(storedAddresses);
      toast.success("Address saved");
      setToggleForm(false);
      resetForm();
    }
  };
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
                            <Formik
                              initialValues={initialFormValue}
                              validationSchema={validationSchema}
                              onSubmit={handleAddressSubmit}
                            >
                              {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                              }) => (
                                <Form onSubmit={handleSubmit}>
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
                                          value={values.name}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.name && !!errors.name
                                          }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.name}
                                        </Form.Control.Feedback>
                                      </FloatingLabel>
                                    </Col>
                                    <Col>
                                      <FloatingLabel
                                        controlId="floatingInputGrid3"
                                        label="Mobile Number"
                                      >
                                        <Form.Control
                                          type="text"
                                          placeholder="Mobile Number"
                                          name="mobile"
                                          value={values.mobile}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.mobile && !!errors.mobile
                                          }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.mobile}
                                        </Form.Control.Feedback>
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
                                          value={values.streetAddress}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.streetAddress &&
                                            !!errors.streetAddress
                                          }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.streetAddress}
                                        </Form.Control.Feedback>
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
                                          value={values.zip}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.zip && !!errors.zip
                                          }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.zip}
                                        </Form.Control.Feedback>
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
                                          value={values.city}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.city && !!errors.city
                                          }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.city}
                                        </Form.Control.Feedback>
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
                                          value={values.state}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.state && !!errors.state
                                          }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.state}
                                        </Form.Control.Feedback>
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
                                      <Button
                                        type="submit"
                                        variant="primary px-3"
                                      >
                                        Save Delivery Address
                                      </Button>
                                    </Col>
                                  </Row>
                                </Form>
                              )}
                            </Formik>
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
