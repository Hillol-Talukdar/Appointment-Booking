import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    }
  }, [userInfo]);

  return (
    <>
      <h1>Welcome to Appointment Booking System</h1>
    </>
  );
};

export default HomeScreen;
