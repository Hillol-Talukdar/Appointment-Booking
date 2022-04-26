import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  availabilityListReducer,
  availabilityCreateReducer,
  availabilityDeleteReducer,
  availabilityUpdateReducer,
  availabilityDetailsReducer,
} from './reducers/availabilityReducers';

import {
  appointmentListReducer,
  appointmentCreateReducer,
  appointmentDeleteReducer,
  appointmentUpdateReducer,
  appointmentDetailsReducer,
} from './reducers/appointmentReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,

  availabilityList: availabilityListReducer,
  availabilityDetails: availabilityDetailsReducer,
  availabilityCreate: availabilityCreateReducer,
  availabilityDelete: availabilityDeleteReducer,
  availabilityUpdate: availabilityUpdateReducer,

  appointmentList: appointmentListReducer,
  appointmentDetails: appointmentDetailsReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentDelete: appointmentDeleteReducer,
  appointmentUpdate: appointmentUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
