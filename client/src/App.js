import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TeacherRegisterScreen from './screens/TeacherRegisterScreen';
import StudentRegisterScreen from './screens/StudentRegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserEditScreen from './screens/UserEditScreen';
import Sidebar from './components/Sidebar';
import TeacherListScreen from './screens/TeacherListScreen';
import StudentListScreen from './screens/StudentListScreen';
import AvailabilityListScreen from './screens/AvailabilityListScreen';
import AvailabilityAddScreen from './screens/AvailabilityAddScreen';
import AvailabilityEditScreen from './screens/AvailabilityEditScreen';
import TeacherProfileScreen from './screens/TeacherProfileScreen';
import AppointmentAddScreen from './screens/AppointmentAddScreen';
import AppointmentListScreen from './screens/AppointmentListScreen';
import ScheduleListScreen from './screens/ScheduleListScreen';

const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <Container>
              <Route path="/" component={HomeScreen} exact />

              <Route path="/login" component={LoginScreen} exact />

              <Route
                path="/teacher-signup"
                component={TeacherRegisterScreen}
                exact
              />

              <Route
                path="/student-signup"
                component={StudentRegisterScreen}
                exact
              />

              <Route path="/profile" component={ProfileScreen} exact />

              <Route path="/teacherlist" component={TeacherListScreen} exact />
              <Route path="/studentlist" component={StudentListScreen} exact />

              <Route
                path="/schedule-list"
                component={ScheduleListScreen}
                exact
              />

              <Route
                path="/availability-list"
                component={AvailabilityListScreen}
                exact
              />

              <Route
                path="/appointment-list"
                component={AppointmentListScreen}
                exact
              />

              <Route
                path="/add-availability"
                component={AvailabilityAddScreen}
                exact
              />

              <Route
                path="/availability/:id/edit"
                component={AvailabilityEditScreen}
                exact
              />

              <Route
                path="/teacher/:id"
                component={TeacherProfileScreen}
                exact
              />

              <Route
                path="/add-appointment/:id"
                component={AppointmentAddScreen}
                exact
              />

              <Route
                path="/admin/user/:id/edit"
                component={UserEditScreen}
                exact
              />

              <Route path="/search/:keyword" component={HomeScreen} exact />

              <Route path="/page/:pageNumber" component={HomeScreen} exact />
            </Container>
          </Col>
        </Row>
      </main>
    </Router>
  );
};

export default App;
