import {
  AVAILABILITY_CREATE_REQUEST,
  AVAILABILITY_CREATE_SUCCESS,
  AVAILABILITY_CREATE_FAIL,
  AVAILABILITY_LIST_REQUEST,
  AVAILABILITY_LIST_SUCCESS,
  AVAILABILITY_LIST_FAIL,
  AVAILABILITY_LIST_RESET,
  AVAILABILITY_DELETE_REQUEST,
  AVAILABILITY_DELETE_SUCCESS,
  AVAILABILITY_DELETE_FAIL,
  AVAILABILITY_UPDATE_REQUEST,
  AVAILABILITY_UPDATE_SUCCESS,
  AVAILABILITY_UPDATE_FAIL,
  AVAILABILITY_UPDATE_RESET,
  AVAILABILITY_DETAILS_REQUEST,
  AVAILABILITY_DETAILS_SUCCESS,
  AVAILABILITY_DETAILS_FAIL,
} from '../constants/availabilityConstant';

export const availabilityCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AVAILABILITY_CREATE_REQUEST:
      return { loading: true };
    case AVAILABILITY_CREATE_SUCCESS:
      return { loading: false, success: true, availability: action.payload };
    case AVAILABILITY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const availabilityDetailsReducer = (
  state = { availability: {} },
  action
) => {
  switch (action.type) {
    case AVAILABILITY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case AVAILABILITY_DETAILS_SUCCESS:
      return { loading: false, availability: action.payload };
    case AVAILABILITY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const availabilityListReducer = (
  state = { availabilitys: [] },
  action
) => {
  switch (action.type) {
    case AVAILABILITY_LIST_REQUEST:
      return { loading: true };
    case AVAILABILITY_LIST_SUCCESS:
      return { loading: false, availabilitys: action.payload };
    case AVAILABILITY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case AVAILABILITY_LIST_RESET:
      return { availabilitys: [] };
    default:
      return state;
  }
};

export const availabilityDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AVAILABILITY_DELETE_REQUEST:
      return { loading: true };
    case AVAILABILITY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AVAILABILITY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const availabilityUpdateReducer = (
  state = { availability: {} },
  action
) => {
  switch (action.type) {
    case AVAILABILITY_UPDATE_REQUEST:
      return { loading: true };
    case AVAILABILITY_UPDATE_SUCCESS:
      return { loading: false, success: true, availability: action.payload };
    case AVAILABILITY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case AVAILABILITY_UPDATE_RESET:
      return { availability: {} };
    default:
      return state;
  }
};
