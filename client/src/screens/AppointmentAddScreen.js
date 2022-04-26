import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createAppointment } from '../actions/appointmentAction';
import { detailsAvailability } from '../actions/availabilityActions';

const AppointmentAddScreen = ({ match, history }) => {
  const availabilityId = match.params.id;

  const [teacher, setTeacher] = useState('');
  const [student, setStudent] = useState('');
  const [course, setCourse] = useState('');
  const [agenda, setAgenda] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const dispatch = useDispatch();

  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { loading, error, appointment, success } = appointmentCreate;

  const availabilityDetails = useSelector((state) => state.availabilityDetails);
  const {
    loading: availabilityLoading,
    error: errorAvailability,
    availability,
  } = availabilityDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error: errorLogin, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    } else if (success) {
      history.push('/appointment-list');
    } else {
      if (
        !availability?.data?.startTime ||
        availability?.data?._id !== availabilityId
      ) {
        dispatch(detailsAvailability(availabilityId));
      } else {
        setStartTime(availability.data.startTime);
        setEndTime(availability.data.endTime);
        setTeacher(availability.data.teacher);
      }
    }
  }, [history, appointment, userInfo, availabilityId, availability]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createAppointment({
        teacher,
        student,
        agenda,
        course,
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
          <>
            {availabilityLoading ? (
              <Loader />
            ) : errorAvailability ? (
              <Message variant="danger">{errorAvailability}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="course">
                  <Form.Label>Course name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter course name"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="agenda">
                  <Form.Label>Agenda</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter agenda"
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="dark" className="mt-3">
                  Add Appointment
                </Button>
              </Form>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default AppointmentAddScreen;
