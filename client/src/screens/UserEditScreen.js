import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstant';

export const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [isActivated, setIsActivated] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/');
    } else {
      if (!user.data?.name || user.data?._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.data?.name);
        setEmail(user.data?.email);
        setIsActivated(user.data?.isActivated);

        if (user.data?.role === 'teacher') {
          setCourse(user.data?.course);
          setDepartment(user.data?.department);
        }

        if (user.data?.role === 'student') {
          setStudentId(user.data?.studentId);
          setDepartment(user.data?.department);
        }
      }
    }
  }, [dispatch, history, userId, user, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (user.data.role == 'student') {
      dispatch(
        updateUser({
          _id: userId,
          name,
          email,
          studentId,
          department,
          isActivated,
        })
      );
    } else if (user.data?.role == 'teacher') {
      dispatch(
        updateUser({
          _id: userId,
          name,
          email,
          course,
          department,
          isActivated,
        })
      );
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Edit User</h1>

        {loadingUpdate && <Loader />}

        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {user.data?.role === 'teacher' && (
              <Form.Group controlId="course">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            {user.data?.role === 'student' && (
              <Form.Group controlId="studentId">
                <Form.Label>Student Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter student Id"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            {user.data?.role === 'teacher' && (
              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            {user.data?.role === 'student' && (
              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId="isActivated">
              <Form.Check
                type="checkbox"
                label="is Activated"
                checked={isActivated}
                onChange={(e) => setIsActivated(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
