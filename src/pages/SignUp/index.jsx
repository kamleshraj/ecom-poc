import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { toast } from "react-toastify";
import { Helmet } from "../../components/Helmet";
import { Loader } from "../../components/Loader";
import styles from "./SingUp.module.scss";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";

const SignUp = () => {
  const [userInfo,setUserInfo] = useState({
    username:'',
    email:'',
    password:''
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: userInfo.username,
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: userInfo.username,
        email: userInfo.email,
        photoURL: null,
      });
      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Please use a different email.");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Helmet title="Sign Up">
      <section className={styles.singUpWrapper}>
        <Container>
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <Col md="4" className="m-auto py-5">
                <Card className="shadow">
                  <CardHeader className="bg-secondary text-white text-center fs-600 fs-5">
                    Sign Up
                  </CardHeader>
                  <CardBody>
                    <Form className="signUp-form" onSubmit={signup}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="UserName"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          value={userInfo.username}
                          onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                          required
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          required
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
                          value={userInfo.password}
                          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                          required
                        />
                      </FloatingLabel>
                      <div className="d-flex justify-content-center py-4">
                        <Button type="submit" variant="primary w-50">
                          Create an Account
                        </Button>
                      </div>
                      <p>
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
                    </Form>
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

export default SignUp;
