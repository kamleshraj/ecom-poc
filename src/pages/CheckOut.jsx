import { Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import { Helmet } from "../components"

const CheckOut = ()=>{
    return(
        <>
        <Helmet title="Checkout">
            <Container>
                <Card className="my-5 w-75 m-auto">
                    <CardBody>
                <Form>
                    <Row className="g-3 mb-3">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid1" label="First Name">
                        <Form.Control type="text" placeholder="First Name" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid2" label="Middle Name">
                        <Form.Control type="text" placeholder="Middle Name" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid3" label="Last Name">
                        <Form.Control type="text" placeholder="Last Name" />
                        </FloatingLabel>
                    </Col>
                    </Row>
                    <Row className="g-2">
                    <Col md>
                    <FloatingLabel controlId="floatingTextarea4" label="Comments">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    </Col>
                    </Row>
                    <Row className="mt-4 justify-content-end">
                        <Col>
                        <Button variant="danger">Continue</Button>
                        </Col>
                    </Row>
                </Form>
                </CardBody>
                </Card>
            </Container>
        </Helmet>
        </>
    )
}

export default CheckOut