import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';

export const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo || !userInfo?.user) {
      history.push('/login');
    } else {
      if (!user || !user?.data || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.data?.name);
        setEmail(user.data?.email);

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
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    // e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      if (user.data?.role === 'admin') {
        dispatch(
          updateUserProfile({ id: user.data._id, name, email, password })
        );
      } else if (user.data?.role === 'teacher') {
        dispatch(
          updateUserProfile({
            id: user.data._id,
            name,
            email,
            course,
            department,
            password,
          })
        );
      } else if (user.data?.role === 'student') {
        dispatch(
          updateUserProfile({
            id: user.data._id,
            name,
            email,
            department,
            studentId,
            password,
          })
        );
      }
    }
  };

  return (
    <>
      <h2>User Profile</h2>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
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

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required={true}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="dark" className="mt-3">
          Update
        </Button>
      </Form>
    </>
  );
};

export default ProfileScreen;
