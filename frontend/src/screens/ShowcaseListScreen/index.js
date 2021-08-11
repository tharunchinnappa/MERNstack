import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  listShowcaseItems,
  createShowcaseItems,
  deleteShowcaseItem,
} from "../../redux/actions/showcaseActions";
import { SHOWCASE_CREATE_RESET } from "../../redux/constants/showcaseConstants";

const ShowcaseListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const showcaseItemsList = useSelector((state) => state.showcaseItemsList);
  const { loading, error, showcase } = showcaseItemsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showcaseItemDelete = useSelector((state) => state.showcaseItemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = showcaseItemDelete;

  const showcaseItemCreate = useSelector((state) => state.showcaseItemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    showcase: createdItem,
  } = showcaseItemCreate;

  useEffect(() => {
    dispatch({ type: SHOWCASE_CREATE_RESET });

    if (successCreate && userInfo.isAdmin) {
      history.push(`/admin/showcase/${createdItem._id}/edit`);
    } else if (userInfo && userInfo.isAdmin) {
      dispatch(listShowcaseItems());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdItem]);

  const createProductHandler = () => {
    dispatch(createShowcaseItems());
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteShowcaseItem(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <h1 className=" display-1 text-center text-white " id="heading-about">
          Showcase
        </h1>
        <Col className="text-right ml-auto">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" />
            Create showcase item
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
                <td>{item.description}</td>
                <td>
                  <LinkContainer to={`/admin/showcase/${item._id}/edit`}>
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
