import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { deleteProduct } from "../../redux/actions/productActions";
import {
  listShowcaseItems,
  createShowcaseItems,
} from "../../redux/actions/showcaseActions";
import { SHOWCASE_CREATE_RESET } from "../../redux/constants/showcaseConstants";

const ShowcaseListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const ShowcaseItemsList = useSelector((state) => state.ShowcaseItemsList);
  const { loading, error, showcase } = ShowcaseItemsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const ShowcaseItemCreate = useSelector((state) => state.ShowcaseItemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = ShowcaseItemCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: SHOWCASE_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/showcase/${createdProduct._id}/edit`);
    } else {
      dispatch(listShowcaseItems());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const createProductHandler = () => {
    dispatch(createShowcaseItems());
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Showcase Items</h1>
        </Col>
        <Col className="text-right ml-auto">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table stripped="true" bordered hover responsive className="table-sm">
          <thead className="bg-dark text-light">
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {showcase.map((item, index) => (
              <tr key={item._id}>
                <td>{index}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <img src={item.image} />
                </td>
                <td>{item.description}</td>
                <td>
                  <LinkContainer to={`/admin/product/${item._id}/edit`}>
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ShowcaseListScreen;
