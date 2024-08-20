import { Button, Card, CardBody, Container, Table } from "react-bootstrap";
import { Helmet } from "./../components/Helmet/index";
import { useDispatch, useSelector } from "react-redux";
import { SlBasket } from "react-icons/sl";
import { addToCart } from "../Redux/cart/cartSlice";

const CompareProduct = () => {
  const { compareList } = useSelector((state) => state.compare);
  const dispatch = useDispatch()
  return (
    <>
      <Helmet title="Compare Product">
        <section className="cart-items pt-3">
          <Container fluid>
            <div className="compareProductWrapper pb-4">
              <div className="title text-center py-3">
                <h4 className="title">Compare Product List</h4>
              </div>
              <Card className="border-0">
                <CardBody>
                  <div class="table-responsive">
                    <Table className="bordered align-middle mb-0">
                      <thead class="table-dark">
                        <tr>
                          <th>Product Name</th>
                          <th>Color</th>
                          <th>Product Image</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Reviews</th>
                          <th>Rating</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {compareList.map((product) => {
                          return (
                            <tr key={`${product.id}`}>
                              <td>{product.productName}</td>
                              <td>{product.color}</td>
                              <td>
                                <img
                                  src={product.imgUrl}
                                  alt={product.productName}
                                  className="img-fluid"
                                  width={50}
                                />
                              </td>
                              <td>${product.price}</td>
                              <td>
                                {product.discount && `$${product.discount}`}
                              </td>
                              <td>
                                {product.reviews.map((item, index) => (
                                  <p key={index}>{item.text}</p>
                                ))}
                              </td>
                              <td>
                                <i
                                  className="fa fa-star"
                                  style={{ color: "#ffcf67" }}
                                />{" "}
                                {product.avgRating}
                              </td>
                              <td>
                                <Button variant="warning"
                                onClick={()=>dispatch(addToCart({ product: product, num: 1 }))}
                                >
                                  <SlBasket/> Add to Cart
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default CompareProduct;
