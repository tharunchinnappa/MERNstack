import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./../Rating";
import ProductGallery from "../../components/ProductGallery";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import "./style.scss";

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

const Product = ({ product, history }) => {
  const [qty, setQty] = useState(1);

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="wrapper">
      <div className="card-container">
        <div className="card-show side-front">
          <div className="row">
            <div className="product-image col-12 col-lg-4">
              <ProductGallery images={product.image} />
            </div>
            <div className="content col-12 col-lg-7">
              <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                  <h2>{product.name}</h2>
                </Card.Title>
              </Link>
              <div className="price-rating">
                <div className="price">
                  <h3>Price:</h3>
                  <p>${product.price}</p>
                </div>
                <Row>
                  <h3>Qty:</h3>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <div className="rating">
                  <h3>
                    Rating:
                    <span className="rating-text">{product.rating}</span>
                    <Rating
                      val={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </h3>
                  <div id="rateYo" />
                </div>
              </div>
              <div className="details">
                <SmartText text={product.description} />
              </div>

              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
                onClick={() => addToCartHandler(product._id)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
