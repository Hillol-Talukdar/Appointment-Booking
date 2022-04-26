import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyAppointmentsThisWeek } from '../actions/appointmentAction';

const ScheduleListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    } else {
      dispatch(listMyAppointmentsThisWeek());
    }
  }, [dispatch, history, userInfo]);

  const convertTimeToLocal = (currentTime) => {
    let date = new Date(currentTime);
    return date.toLocaleString();
  };

  return (
    <>
      <h1>Schedule List (this week)</h1>

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
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ScheduleListScreen;
