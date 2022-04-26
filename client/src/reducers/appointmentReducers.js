import {
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_RESET,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_RESET,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
} from '../constants/appointmentConstant';

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_CREATE_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentDetailsReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case APPOINTMENT_DETAILS_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_LIST_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};

export const appointmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return { loading: true };
    case APPOINTMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentUpdateReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_UPDATE_RESET:
      return { appointment: {} };
    default:
      return state;
  }
};
