import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'
import {Loader} from '../../components/Loader'
import {Helmet} from '../../components/Helmet';
import styles from './Login.module.scss'
import { Button, Card, CardBody, CardHeader, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'

const Login = () => {
  const[userLogin,setUserLogin] = useState({
    email:'',
    password:''
  })
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      )
      const user = userCredential.user
      console.log(user);
      
      setLoading(false);
      toast.success('Successfully logged in')
      navigate('/')
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
    }
  }

  return (
    <Helmet title="Login">
      <section className={styles.loginWrapper}>
        <Container>
          <Row>
            {loading ? <Loader/> : (
              <Col md='4' className='m-auto py-5'>
                <Card>
                  <CardHeader className='bg-secondary text-white text-center fs-600 fs-5'>Login</CardHeader>
                  <CardBody>
                  <Form className='login-form' onSubmit={signIn}>
                  <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                      >
                    <Form.Control 
                    type='email'
                    placeholder='Enter your email'
                    value={userLogin.email}
                    onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                      >
                    <Form.Control 
                      type='password'
                      placeholder='Enter your password'
                      value={userLogin.password}
                      onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                    />
                  </FloatingLabel>
                  <div className='d-flex justify-content-center my-4'>
                  <Button type='submit' variant="primary w-50">
                    Login
                  </Button>
                  </div>
                  <p>
                    Don't have an account{' '}
                    <Link to='/signup'>Create an account</Link>
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
  )
}

export default Login