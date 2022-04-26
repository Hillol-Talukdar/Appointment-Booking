import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listMyAvailabilitys,
  deleteAvailability,
} from '../actions/availabilityActions';
import { Link } from 'react-router-dom';

const AvailabilityListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const availabilityList = useSelector((state) => state.availabilityList);
  const { loading, error, availabilitys } = availabilityList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const availabilityDelete = useSelector((state) => state.availabilityDelete);
  const { success: successDelete } = availabilityDelete;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    }
    if (userInfo && userInfo.user?.role === 'teacher') {
      dispatch(listMyAvailabilitys());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAvailability(id));
    }
  };

  const convertTimeToLocal = (currentTime) => {
    let date = new Date(currentTime);
    return date.toLocaleString();
  };

  return (
    <>
      <h1>Available Hours</h1>

      <Link to="/add-availability" className="btn btn-dark">
        Add Available Hours
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {availabilitys.map((availability, idx) => (
              <tr key={availability._id}>
                <td>{idx + 1}</td>
                <td>{convertTimeToLocal(availability.startTime)}</td>
                <td>{convertTimeToLocal(availability.endTime)}</td>

                {userInfo.user.role === 'teacher' && (
                  <td>
                    <LinkContainer
                      to={`/availability/${availability._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(availability._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AvailabilityListScreen;
