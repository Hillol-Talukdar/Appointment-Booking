import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  updateAvailability,
  detailsAvailability,
} from '../actions/availabilityActions';
import { AVAILABILITY_UPDATE_RESET } from '../constants/availabilityConstant';

const AvailabilityEditScreen = ({ match, history }) => {
  const availabilityId = match.params.id;

  const [teacher, setTeacher] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const dispatch = useDispatch();

  const availabilityDetails = useSelector((state) => state.availabilityDetails);
  const { loading, error, availability } = availabilityDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const availabilityUpdate = useSelector((state) => state.availabilityUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = availabilityUpdate;

  const convertTimeToLocal = (currentTime) => {
    let date = new Date(currentTime);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    } else if (successUpdate) {
      dispatch({ type: AVAILABILITY_UPDATE_RESET });
      history.push('/availability-list');
    } else {
      if (
        !availability?.data?.startTime ||
        availability?.data?._id !== availabilityId
      ) {
        dispatch(detailsAvailability(availabilityId));
      } else {
        // setStartTime(availability.data.startTime);
        // setEndTime(availability.data.endTime);
      }
    }
  }, [
    dispatch,
    history,
    availabilityId,
    availability,
    successUpdate,
    userInfo,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAvailability({
        _id: availabilityId,
        startTime,
        endTime,
        teacher,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <h1>Edit Available Hours</h1>

        {loadingUpdate && <Loader />}

        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                // value={convertTimeToLocal(startTime)}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter end time"
                // value={convertTimeToLocal(endTime)}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="dark" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AvailabilityEditScreen;
