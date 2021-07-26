import React from "react";
import { Link } from "react-router-dom";
import Rating from "./../Rating";
import ProductGallery from "../../components/ProductGallery";
import { Card } from "react-bootstrap";
import "./style.scss";

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
                <p>
                  Experience out-of-the-box comfort in this waterproof hiker.
                  With durable leathers, a supportive footbed, and Vibram®
                  traction, all in a versatile package, you won't doubt why Moab
                  stands for Mother-Of-All-Boots™.
                </p>
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
