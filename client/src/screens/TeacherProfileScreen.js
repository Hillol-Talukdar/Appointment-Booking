import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails } from '../actions/userActions';
import { listTeacherAvailabilitysThisWeek } from '../actions/availabilityActions';
import { listTeacherAppointmentsThisWeek } from '../actions/appointmentAction';
import { LinkContainer } from 'react-router-bootstrap';

const TeacherProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const availabilityList = useSelector((state) => state.availabilityList);
  const {
    loading: loadingAvailabilityList,
    error: erroraAilabilityList,
    availabilitys,
  } = availabilityList;

  const appointmentList = useSelector((state) => state.appointmentList);
  const {
    loading: loadingAppointmentList,
    error: erroraAppointmentList,
    appointments,
  } = appointmentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    }
    if (userInfo) {
      dispatch(getUserDetails(match.params.id));
      dispatch(listTeacherAvailabilitysThisWeek(match.params.id));
      dispatch(listTeacherAppointmentsThisWeek(match.params.id));
    } else {
      history.push('/login');
    }
  }, [dispatch, match, userInfo]);

  const convertTimeToLocal = (currentTime) => {
    let date = new Date(currentTime);
    return date.toLocaleString();
  };

  return (
    <>
      <h1>Teacher Profile</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col>Name: {user.data?.name}</Col>

            <Col>
              Email:{' '}
              <a href={`mailto:${user.data?.email}`}>{user.data?.email}</a>
            </Col>
          </Row>

          <Row>
            <Col>Department: {user.data?.department}</Col>
            <Col>Course: {user.data?.course}</Col>
          </Row>

          <hr />

          <Row>
            <Col>
              <h2>Available hours (this week)</h2>

              {loadingAvailabilityList ? (
                <Loader />
              ) : erroraAilabilityList ? (
                <Message variant="danger">{erroraAilabilityList}</Message>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SL NO.</th>
                      <th>START TIME</th>
                      <th>END TIME</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availabilitys.map((availability, idx) => (
                      <tr key={availability._id}>
                        <td>{idx + 1}</td>
                        <td>{convertTimeToLocal(availability.startTime)}</td>
                        <td>{convertTimeToLocal(availability.endTime)}</td>

                        {userInfo.user.role === 'student' && (
                          <td>
                            <LinkContainer
                              to={`/add-appointment/${availability._id}`}
                            >
                              <Button variant="success" className="btn-sm">
                                <i className="fas fa-calendar-check"></i>
                              </Button>
                            </LinkContainer>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>

            <Col>
              <h2>Schedules (this week)</h2>

              {loadingAppointmentList ? (
                <Loader />
              ) : erroraAppointmentList ? (
                <Message variant="danger">{erroraAppointmentList}</Message>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SL NO.</th>
                      <th>START TIME</th>
                      <th>END TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, idx) => (
                      <tr key={appointment._id}>
                        <td>{idx + 1}</td>
                        <td>{convertTimeToLocal(appointment.startTime)}</td>
                        <td>{convertTimeToLocal(appointment.endTime)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default TeacherProfileScreen;
