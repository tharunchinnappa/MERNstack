import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./../Rating";
import ProductGallery from "../../components/ProductGallery";
import { Card } from "react-bootstrap";
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


const Product = ({ product }) => {
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
              <div className="button">Add to Cart</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
