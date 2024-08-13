import { Card, CardBody, Container, Table } from "react-bootstrap";
import { Helmet } from "./../components/Helmet/index";
import { useSelector } from "react-redux";

const CompareProduct = () => {
  const { compareList } = useSelector((state) => state.compare);
  console.log(compareList);

  return (
    <>
      <Helmet title="Compare Product">
        <section className="cart-items pt-3">
          <Container fluid>
            <div className="compareProductWrapper text-center">
              <h4 className="title">Compare Product List</h4>
              <Card className="border-0">
                <CardBody>
                <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Color</th>
                    <th>Product Image</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Reviews</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {compareList.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.productName}</td>
                        <td>{product.category}</td>
                        <td>{product.color}</td>
                        <td><img src={product.imgUrl} alt={product.productName} className="img-fluid" width={50}/></td>
                        <td>${product.price}</td>
                        <td>${product.discount}</td>
                        <td>{product.reviews.map((item)=>item.text)}</td>
                        <td>{product.reviews.map((item)=>item.rating)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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