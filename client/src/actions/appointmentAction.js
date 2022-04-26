import axios from 'axios';
import {
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
} from '../constants/appointmentConstant';

import { logout } from './userActions';

export const createAppointment =
  (appointment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPOINTMENT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      appointment.student = userInfo.user._id;

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/appointment`,
        appointment,
        config
      );

      dispatch({
        type: APPOINTMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAppointments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/appointment`,
      config
    );

    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const listMyAppointments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/appointment/my`,
      config
    );

    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const listMyAppointmentsThisWeek = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/appointment/my/week`,
      config
    );

    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const listTeacherAppointments = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/appointment/teacher/${id}`,
      config
    );

    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const listTeacherAppointmentsThisWeek =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPOINTMENT_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/appointment/teacher/week/${id}`,
        config
      );

      dispatch({
        type: APPOINTMENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: APPOINTMENT_LIST_FAIL,
        payload: message,
      });
    }
  };

export const deleteAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `${process.env.REACT_APP_API}/appointment/${id}`,
      config
    );

    dispatch({
      type: APPOINTMENT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateAppointment =
  (appointment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPOINTMENT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      appointment.teacher = userInfo.user._id;

      const { data } = await axios.patch(
        `${process.env.REACT_APP_API}/appointment/${appointment._id}`,
        appointment,
        config
      );

      dispatch({
        type: APPOINTMENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailsAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/appointment/${id}`,
      config
    );

    dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
