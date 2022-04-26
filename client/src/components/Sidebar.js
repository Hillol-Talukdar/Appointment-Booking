import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <nav className="mt-5 btn">
      {userInfo && userInfo.user?.role === 'admin' && (
        <ul className="nav flex-column align-items-center">
          <li className="nav-item mb-2">
            <Link to="/teacherlist" className="nav-link">
              Teacher list
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/studentlist" className="nav-link">
              Student list
            </Link>
          </li>
        </ul>
      )}

      {userInfo && userInfo.user?.role === 'teacher' && (
        <ul className="nav flex-column align-items-center">
          <li className="nav-item mb-2">
            <Link to="/availability-list" className="nav-link">
              Available hours
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/appointment-list" className="nav-link">
              Appointments
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/schedule-list" className="nav-link">
              Shedule
            </Link>
          </li>
        </ul>
      )}

      {userInfo && userInfo.user?.role === 'student' && (
        <ul className="nav flex-column align-items-center">
          <li className="nav-item mb-2">
            <Link to="/teacherlist" className="nav-link">
              Teacher list
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/appointment-list" className="nav-link">
              Appointments
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/schedule-list" className="nav-link">
              Shedule
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;
