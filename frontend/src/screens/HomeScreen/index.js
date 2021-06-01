import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./../../redux/actions/productActions";
import { Row, Col } from "react-bootstrap";
import Product from "./../../components/Product";
import Loader from "./../../components/Loader";
import Toast from "./../../components/Toast";
import ProductCarousel from "../../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      <Toast text="Login in successfully" />

      {loading ? (
        <Loader />
      ) : error ? (
        <Toast text={error} type="error" />
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
