import {
  SHOWCASE_LIST_REQUEST,
  SHOWCASE_LIST_SUCCESS,
  SHOWCASE_LIST_FAIL,
  SHOWCASE_CREATE_REQUEST,
  SHOWCASE_CREATE_SUCCESS,
  SHOWCASE_CREATE_FAIL,
  SHOWCASE_CREATE_RESET,
} from "../constants/showcaseConstants";

export const ShowcaseItemsListReducer = (state = { showcase: [] }, action) => {
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

export const ShowcaseItemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOWCASE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SHOWCASE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
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
