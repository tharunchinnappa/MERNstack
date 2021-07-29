import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./../../redux/actions/productActions";
import { Row, Col } from "react-bootstrap";
import Loader from "./../../components/Loader";
import Toast from "./../../components/Toast";
import Product from "./../../components/Product";
import "./style.scss";

const Shop = ({ history, match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Toast text={error} type="error" />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id}>
              <Product product={product} history={history} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Shop;
