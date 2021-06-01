import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "./../../components/Message";
import Loader from "../../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "./../../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "./../../redux/constants/orderConstants";
import "./styles.scss";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  const check = () => {
    if (userInfo) {
      if (!userInfo.isAdmin) {
        return userInfo._id === order.user._id;
      }
    } else if (!userInfo) {
      return false;
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {check() && !order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <div className="container-fluid my-5 d-flex justify-content-center">
        <div className="card card-1">
          <div className="card-header bg-white">
            <div className="media flex-sm-row flex-column-reverse justify-content-between ">
              <div className="col my-auto">
                <h4 className="mb-0">
                  Thanks for your Order,
                  <span className="change-color">{order.user.name}</span> !
                </h4>
              </div>
              <div className="col-auto text-center my-auto pl-0 pt-sm-4">
                <img
                  className="img-fluid my-auto align-items-center mb-0 pt-3"
                  src="/images/logo.png"
                  width={115}
                  height={115}
                />
                <p className="mt-2 mb-4 pt-0 Glasses">
                  Cup Of Coffee For Everyone
                </p>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row justify-content-between mb-3">
              <div className="col-auto">
                <h6 className="color-1 mb-0 change-color">Receipt</h6>
              </div>
              <div className="col-auto ">
                <small>Order ID : {order._id}</small>
              </div>
            </div>

            {order.orderItems.map((item, index) => (
              <div className="row mb-4" key={index}>
                <div className="col">
                  <div className="card card-2">
                    <div className="card-body">
                      <div className="media">
                        <div className="sq align-self-center ">
                          <img
                            className="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0"
                            src={item.image}
                            alt={item.name}
                            width={135}
                            height={135}
                          />
                        </div>
                        <div className="media-body my-auto text-right">
                          <div className="row my-auto flex-column flex-md-row">
                            <div className="col my-auto">
                              <h6 className="mb-0"> {item.name}</h6>
                            </div>

                            <div className="col my-auto">
                              <small>Price: {item.price}</small>
                            </div>
                            <div className="col my-auto">
                              <small>Qty: {item.qty}</small>
                            </div>
                            <div className="col my-auto">
                              <h6 className="mb-0">
                                Total:
                                {(item.qty * item.price).toFixed(2)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-3 " />
                      <div className="row">
                        <div className="col-md-3 mb-3">
                          <small>
                            Track Order
                            <span>
                              <i
                                className=" ml-2 fa fa-refresh"
                                aria-hidden="true"
                              />
                            </span>
                          </small>
                        </div>
                        <div className="col mt-auto">
                          <div className="progress my-auto">
                            <div
                              className="progress-bar progress-bar rounded"
                              style={
                                order.isDelivered
                                  ? { width: "100%" }
                                  : order.isPaid
                                  ? { width: "38%" }
                                  : { width: "0%" }
                              }
                              role="progressbar"
                              aria-valuenow={25}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <div className="media row justify-content-between ">
                            <div className="col-auto text-right">
                              <span>
                                <small className="text-right mr-sm-2">
                                  Shipped
                                </small>
                                <i className="fa fa-circle active" />
                              </span>
                            </div>
                            <div className="flex-col">
                              <span>
                                <small className="text-right mr-sm-2">
                                  Out for delivery
                                </small>
                                <i
                                  className={`fa fa-circle ${
                                    order.isDelivered ? "active" : ""
                                  } `}
                                />
                              </span>
                            </div>
                            <div className="col-auto flex-col-auto">
                              <small className="text-right mr-sm-2">
                                Delivered
                              </small>
                              <span>
                                <i
                                  className={`fa fa-circle ${
                                    order.isDelivered ? "active" : ""
                                  } `}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="row mt-4">
              <div className="col">
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <p className="mb-1 text-dark">
                      <b>Order Details</b>
                    </p>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="flex-sm-col text-right col">
                    <p className="mb-1">
                      <b>Items</b>
                    </p>
                  </div>
                  <div className="flex-sm-col col-auto">
                    <p className="mb-1">₹ {order.itemsPrice}</p>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="flex-sm-col text-right col">
                    <p className="mb-1">
                      <b>GST 18%</b>
                    </p>
                  </div>
                  <div className="flex-sm-col col-auto">
                    <p className="mb-1">₹ {order.taxPrice}</p>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="flex-sm-col text-right col">
                    <p className="mb-1">
                      <b>Delivery Charges</b>
                    </p>
                  </div>
                  <div className="flex-sm-col col-auto">
                    <p className="mb-1"> ₹ {order.shippingPrice}</p>
                  </div>
                </div>

                <div className="row justify-content-between">
                  <div className="flex-sm-col text-right col">
                    <p className="mb-1">
                      <b>Total</b>
                    </p>
                  </div>
                  <div className="flex-sm-col col-auto">
                    <p className="mb-1">₹ {order.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row invoice ">
              <div className="col">
                <p className="mb-1"> Invoice Number : 788152</p>
                <p className="mb-1">Invoice Date : 22 Dec,2019</p>
                <p className="mb-1">Recepits Voucher:18KU-62IIK</p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="jumbotron-fluid">
              <div className="row justify-content-between ">
                <div className="col-sm-auto col-auto my-auto">
                  <img
                    className="img-fluid my-auto align-self-center "
                    src="/images/logo.png"
                    width={115}
                    height={115}
                  />
                </div>
                <div className="col-auto my-auto ">
                  <h2 className="mb-0 font-weight-bold">TOTAL PAID</h2>
                </div>
                <div className="col-auto my-auto ml-auto">
                  <h1 className="display-3 ">₹ {order.totalPrice}</h1>
                </div>
              </div>
              <div className="row mb-3 mt-3 mt-md-0">
                <div className="col-auto border-line">
                  <small className="text-white">PAN:AA02hDW7E</small>
                </div>
                <div className="col-auto border-line">
                  <small className="text-white">CIN:UMMC20PTC </small>
                </div>
                <div className="col-auto ">
                  <small className="text-white">GSTN:268FD07EXX </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
