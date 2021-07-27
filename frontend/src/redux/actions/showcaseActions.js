import axios from "axios";
import {
  SHOWCASE_LIST_REQUEST,
  SHOWCASE_LIST_SUCCESS,
  SHOWCASE_LIST_FAIL,
  SHOWCASE_CREATE_REQUEST,
  SHOWCASE_CREATE_SUCCESS,
  SHOWCASE_CREATE_FAIL,
  SHOWCASE_DELETE_REQUEST,
  SHOWCASE_DELETE_SUCCESS,
  SHOWCASE_DELETE_FAIL,
  SHOWCASE_DETAILS_REQUEST,
  SHOWCASE_DETAILS_SUCCESS,
  SHOWCASE_DETAILS_FAIL,
  SHOWCASE_UPDATE_REQUEST,
  SHOWCASE_UPDATE_SUCCESS,
  SHOWCASE_UPDATE_FAIL,
} from "../constants/showcaseConstants";

export const listShowcaseItems = () => async (dispatch) => {
  try {
    dispatch({ type: SHOWCASE_LIST_REQUEST });
    const { data } = await axios.get("/api/showcase");
    dispatch({
      type: SHOWCASE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOWCASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listShowcaseItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOWCASE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/showcase/${id}`);
    dispatch({
      type: SHOWCASE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOWCASE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createShowcaseItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOWCASE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/showcase`, {}, config);

    dispatch({
      type: SHOWCASE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOWCASE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteShowcaseItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOWCASE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/showcase/${id}`, config);

    dispatch({
      type: SHOWCASE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SHOWCASE_DELETE_FAIL,
      payload: error.response$$error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateShowcaseItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOWCASE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/showcase/${item._id}`, item, config);

    dispatch({
      type: SHOWCASE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOWCASE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
