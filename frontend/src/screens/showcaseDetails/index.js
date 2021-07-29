import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { listShowcaseItemDetails } from "./../../redux/actions/showcaseActions";
import Loader from "./../../components/Loader";
import Toast from "./../../components/Toast";
import { SHOWCASE_DETAILS_RESET } from "../../redux/constants/showcaseConstants";

const SmartText = ({ text, length = 200 }) => {
  const [showLess, setShowLess] = useState(true);

  if (text.length < length) {
    return <p>{text}</p>;
  }

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: showLess ? `${text.slice(0, length)}...` : text,
        }}
      ></p>
      <a
        style={{ color: "black", cursor: "pointer" }}
        onClick={() => setShowLess(!showLess)}
      >
        &nbsp;View {showLess ? "More..." : "Less"}
      </a>
    </div>
  );
};

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const showcaseDetails = useSelector((state) => state.showcaseDetails);
  const { loading, error, showcaseItem } = showcaseDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShowcaseItemDetails(match.params.id));

    return () => {
      dispatch({ type: SHOWCASE_DETAILS_RESET });
    };
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <Container>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Toast type="error" text={error} />
      ) : (
        <>
          <Row>
            <Col md={12} lg={12}>
              {showcaseItem.image && (
                <Image
                  src={`http://${window.location.host}/${showcaseItem.image.path}`}
                  fluid
                />
              )}
            </Col>
            <Col md={4} lg={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>{showcaseItem.name}</h2>
                </ListGroupItem>

                <ListGroupItem>Price: ${showcaseItem.price}</ListGroupItem>
                <ListGroupItem>
                  Description:
                  <SmartText
                    text={`${
                      showcaseItem.description && showcaseItem.description
                    }`}
                  />
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${showcaseItem.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {showcaseItem.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {showcaseItem.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(showcaseItem.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={showcaseItem.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
