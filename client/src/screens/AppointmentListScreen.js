import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listMyAppointments,
  updateAppointment,
} from '../actions/appointmentAction';
import { Link } from 'react-router-dom';

const AppointmentListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;

  const appointmentUpdate = useSelector((state) => state.appointmentUpdate);
  const { success: successUpdate } = appointmentUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    } else {
      dispatch(listMyAppointments());
    }
  }, [dispatch, history, userInfo, successUpdate]);

  const rejectHandler = (appointment) => {
    appointment.status = 'rejected';

    if (window.confirm('Are you sure')) {
      dispatch(updateAppointment(appointment));
    }
  };

  const acceptHandler = (appointment) => {
    appointment.status = 'accepted';

    if (window.confirm('Are you sure')) {
      dispatch(updateAppointment(appointment));
    }
  };

  const convertTimeToLocal = (currentTime) => {
    let date = new Date(currentTime);
    return date.toLocaleString();
  };

  return (
    <>
      <h1>Appointment List</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>START TIME</th>
                <th>END TIME</th>

                {userInfo.user?.role === 'student' && <th>TEACHER</th>}
                {userInfo.user?.role === 'student' && <th>EMAIL</th>}

                {userInfo.user?.role === 'teacher' && <th>STUDENT</th>}
                {userInfo.user?.role === 'teacher' && <th>EMAIL</th>}

                <th>COURSE</th>
                <th>AGENDA</th>
                <th>STATUS</th>

                {userInfo.user?.role === 'teacher' && <th></th>}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, idx) => (
                <tr key={appointment._id}>
                  <td>{idx + 1}</td>
                  <td>{convertTimeToLocal(appointment.startTime)}</td>
                  <td>{convertTimeToLocal(appointment.endTime)}</td>

                  {userInfo.user?.role === 'student' && (
                    <td>{appointment.teacher?.name}</td>
                  )}
                  {userInfo.user?.role === 'student' && (
                    <td>{appointment.teacher?.email}</td>
                  )}

                  {userInfo.user?.role === 'teacher' && (
                    <td>{appointment.student?.name}</td>
                  )}
                  {userInfo.user?.role === 'teacher' && (
                    <td>{appointment.student?.name}</td>
                  )}

                  <td>{appointment.course}</td>
                  <td>{appointment.agenda}</td>

                  {appointment.status === 'pending' && (
                    <td>
                      <i className="fas fa-hourglass"></i>
                    </td>
                  )}

                  {appointment.status === 'accepted' && (
                    <td>
                      <i className="fas fa-check"></i>
                    </td>
                  )}

                  {appointment.status === 'rejected' && (
                    <td>
                      <i className="fas fa-ban"></i>
                    </td>
                  )}

                  {userInfo.user?.role === 'teacher' &&
                    appointment.status !== 'accepted' && (
                      <td>
                        <Button
                          variant="success"
                          className="btn-sm"
                          onClick={() => acceptHandler(appointment)}
                        >
                          <i className="fas fa-check"></i>
                        </Button>

                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => rejectHandler(appointment)}
                        >
                          <i className="fas fa-ban"></i>
                        </Button>
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AppointmentListScreen;
