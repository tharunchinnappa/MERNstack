import {
  SHOWCASE_LIST_REQUEST,
  SHOWCASE_LIST_SUCCESS,
  SHOWCASE_LIST_FAIL,
  SHOWCASE_CREATE_REQUEST,
  SHOWCASE_CREATE_SUCCESS,
  SHOWCASE_CREATE_FAIL,
  SHOWCASE_CREATE_RESET,
  SHOWCASE_DELETE_REQUEST,
  SHOWCASE_DELETE_SUCCESS,
  SHOWCASE_DELETE_FAIL,
  SHOWCASE_DETAILS_REQUEST,
  SHOWCASE_DETAILS_SUCCESS,
  SHOWCASE_DETAILS_FAIL,
  SHOWCASE_DETAILS_RESET,
  SHOWCASE_UPDATE_REQUEST,
  SHOWCASE_UPDATE_SUCCESS,
  SHOWCASE_UPDATE_FAIL,
  SHOWCASE_UPDATE_RESET,
} from "../constants/showcaseConstants";

export const showcaseItemsListReducer = (state = { showcase: [] }, action) => {
  switch (action.type) {
    case SHOWCASE_LIST_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SHOWCASE_LIST_SUCCESS:
      return {
        loading: false,
        showcase: action.payload,
      };
    case SHOWCASE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const showcaseDetailsReducer = (
  state = { showcaseItem: {} },
  action,
) => {
  switch (action.type) {
    case SHOWCASE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SHOWCASE_DETAILS_SUCCESS:
      return {
        loading: false,
        showcaseItem: action.payload,
      };
    case SHOWCASE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOWCASE_DETAILS_RESET:
      return {
        showcaseItem: {},
      };
    default:
      return state;
  }
};

export const showcaseItemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOWCASE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SHOWCASE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        showcase: action.payload,
      };
    case SHOWCASE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOWCASE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const showcaseItemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOWCASE_DELETE_REQUEST:
      return {
        loading: true,
      };
    case SHOWCASE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SHOWCASE_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const showcaseUpdateReducer = (state = { showcaseItem: {} }, action) => {
  switch (action.type) {
    case SHOWCASE_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case SHOWCASE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        showcaseItem: action.payload,
      };
    case SHOWCASE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOWCASE_UPDATE_RESET:
      return { showcaseItem: {} };
    default:
      return state;
  }
};
