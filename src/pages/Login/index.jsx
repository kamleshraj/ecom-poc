import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { IoLogoGoogleplus } from "react-icons/io";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import { Helmet } from "../../components/Helmet";
import styles from "./Login.module.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const {cartList} = useSelector((state)=>state.cart);
  
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      setLoading(false);
      toast.success("Successfully logged in");
      if(cartList.length > 0){
        navigate("/cart");
      }else{
      navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setLoading(false);
      toast.success("Logged in with Google successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Google login failed");
    }
  };
  return (
    <Helmet title="Login">
      <section className={styles.loginWrapper}>
        <Container>
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <Col md="4" className="m-auto py-5">
                <Card className="shadow">
                  <CardHeader className="bg-secondary text-white text-center fs-600 fs-5">
                    Login
                  </CardHeader>
                  <CardBody>
                    <Form className="login-form" onSubmit={signIn}>
                      <FloatingLabel
                        controlId="floatingInputEmail"
                        label="Email"
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={userLogin.email}
                          onChange={(e) =>
                            setUserLogin({
                              ...userLogin,
                              email: e.target.value,
                            })
                          }
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          value={userLogin.password}
                          onChange={(e) =>
                            setUserLogin({
                              ...userLogin,
                              password: e.target.value,
                            })
                          }
                        />
                      </FloatingLabel>
                      <div className="d-flex justify-content-center my-4">
                        <Button type="submit" variant="primary w-100">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <hr />
                    <div className="login-btn-google text-center">
                      <Button
                        variant="danger w-100"
                        onClick={loginWithGoogle}
                        disabled={loading}
                      >
                        <IoLogoGoogleplus className="fs-4" />{" "}
                        {loading ? "Logging in..." : "Sign In with Google"}
                      </Button>
                      <p className="pt-4">
                        Don't have an account{" "}
                        <Link to="/sign-up">Create an account</Link>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
