import axios from 'axios';
import {
  AVAILABILITY_CREATE_REQUEST,
  AVAILABILITY_CREATE_SUCCESS,
  AVAILABILITY_CREATE_FAIL,
  AVAILABILITY_LIST_REQUEST,
  AVAILABILITY_LIST_SUCCESS,
  AVAILABILITY_LIST_FAIL,
  AVAILABILITY_DELETE_REQUEST,
  AVAILABILITY_DELETE_SUCCESS,
  AVAILABILITY_DELETE_FAIL,
  AVAILABILITY_UPDATE_REQUEST,
  AVAILABILITY_UPDATE_SUCCESS,
  AVAILABILITY_UPDATE_FAIL,
  AVAILABILITY_DETAILS_REQUEST,
  AVAILABILITY_DETAILS_SUCCESS,
  AVAILABILITY_DETAILS_FAIL,
} from '../constants/availabilityConstant';
import { logout } from './userActions';

export const createAvailability =
  (availability) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVAILABILITY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      availability.teacher = userInfo.user._id;

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/availability`,
        availability,
        config
      );

      dispatch({
        type: AVAILABILITY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: AVAILABILITY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAvailabilitys = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AVAILABILITY_LIST_REQUEST,
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
      `${process.env.REACT_APP_API}/availability`,
      config
    );

    dispatch({
      type: AVAILABILITY_LIST_SUCCESS,
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
      type: AVAILABILITY_LIST_FAIL,
      payload: message,
    });
  }
};

export const listMyAvailabilitys = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AVAILABILITY_LIST_REQUEST,
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
      `${process.env.REACT_APP_API}/availability/my`,
      config
    );

    dispatch({
      type: AVAILABILITY_LIST_SUCCESS,
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
      type: AVAILABILITY_LIST_FAIL,
      payload: message,
    });
  }
};

export const listMyAvailabilitysThisWeek = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AVAILABILITY_LIST_REQUEST,
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
      `${process.env.REACT_APP_API}/availability/my/week`,
      config
    );

    dispatch({
      type: AVAILABILITY_LIST_SUCCESS,
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
      type: AVAILABILITY_LIST_FAIL,
      payload: message,
    });
  }
};

export const listTeacherAvailabilitys = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AVAILABILITY_LIST_REQUEST,
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
      `${process.env.REACT_APP_API}/availability/teacher/${id}`,
      config
    );

    dispatch({
      type: AVAILABILITY_LIST_SUCCESS,
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
      type: AVAILABILITY_LIST_FAIL,
      payload: message,
    });
  }
};

export const listTeacherAvailabilitysThisWeek =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVAILABILITY_LIST_REQUEST,
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
        `${process.env.REACT_APP_API}/availability/teacher/week/${id}`,
        config
      );

      dispatch({
        type: AVAILABILITY_LIST_SUCCESS,
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
        type: AVAILABILITY_LIST_FAIL,
        payload: message,
      });
    }
  };

export const deleteAvailability = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AVAILABILITY_DELETE_REQUEST,
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
      `${process.env.REACT_APP_API}/availability/${id}`,
      config
    );

    dispatch({
      type: AVAILABILITY_DELETE_SUCCESS,
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
      type: AVAILABILITY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateAvailability =
  (availability) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVAILABILITY_UPDATE_REQUEST,
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

      availability.teacher = userInfo.user._id;

      const { data } = await axios.patch(
        `${process.env.REACT_APP_API}/availability/${availability._id}`,
        availability,
        config
      );

      dispatch({
        type: AVAILABILITY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: AVAILABILITY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailsAvailability = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: AVAILABILITY_DETAILS_REQUEST });

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
      `${process.env.REACT_APP_API}/availability/${id}`,
      config
    );

    dispatch({
      type: AVAILABILITY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AVAILABILITY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
