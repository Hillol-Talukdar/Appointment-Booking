import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createAvailability } from '../actions/availabilityActions';

const AvailabilityAddScreen = ({ match, history }) => {
  const [teacher, setTeacher] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const dispatch = useDispatch();

  const availabilityCreate = useSelector((state) => state.availabilityCreate);
  const { loading, error, availability, success } = availabilityCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error: errorLogin, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    }
    if (success) {
      history.push('/availability-list');
    }
  }, [history, availability, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createAvailability({
        teacher,
        startTime,
        endTime,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <h1>Add Available Hours</h1>

        {errorLogin && <Message variant="danger">{errorLogin}</Message>}
        {loadingLogin && <Loader />}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter end time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="dark" className="mt-3">
              Add Hours
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AvailabilityAddScreen;
