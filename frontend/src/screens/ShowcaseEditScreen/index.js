import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  listShowcaseItemDetails,
  updateShowcaseItem,
} from "../../redux/actions/showcaseActions";
import FormContainer from "../../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";

const ShowcaseEditScreen = ({ match, history }) => {
  const itemId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const showcaseDetails = useSelector((state) => state.showcaseDetails);
  const { loading, error, showcaseItem } = showcaseDetails;

  const showcaseUpdate = useSelector((state) => state.showcaseUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = showcaseUpdate;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/showcaselist");
    } else {
      if (!showcaseItem.name || showcaseItem._id !== itemId) {
        dispatch(listShowcaseItemDetails(itemId));
      } else {
        setName(showcaseItem.name);
        setPrice(showcaseItem.price);
        setImage(showcaseItem.image);
        setBrand(showcaseItem.brand);
        setDescription(showcaseItem.description);
        setCategory(showcaseItem.category);
        setCountInStock(showcaseItem.countInStock);
      }
    }
  }, [dispatch, history, showcaseItem, itemId, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files;
    var formData = new FormData();
    for (const key of Object.keys(file)) {
      formData.append("image", file[key]);
    }

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/uploads/showcaseupload",
        formData,
        config,
      );

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateShowcaseItem({
        _id: itemId,
        name,
        price,
        description,
        brand,
        image,
        category,
        countInStock,
      }),
    );
  };

  return (
    <>
      <Link to="/admin/showcaselist" className="btn btn-dark my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>
          Edit Product :<p>{name}</p>
        </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image.path || ""}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <img src={`http://${window.location.host}/${image.path}`} />
              <Form.File
                id="image-file"
                label="Choose file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ShowcaseEditScreen;
