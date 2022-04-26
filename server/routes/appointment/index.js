const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointment/appointment.controller');
const checkAuth = require('../../middlewares/checkAuth');
const restrictTo = require('../../middlewares/restrictTo');

router.use(checkAuth);

router
    .route('/')
    .post(restrictTo('student'), appointmentController.addAppointment)
    .get(appointmentController.getAllAppointment);

router
    .route('/my')
    .get(
        restrictTo('teacher', 'student'),
        appointmentController.getAllMyAppointment
    );

router
    .route('/my/week')
    .get(
        restrictTo('teacher', 'student'),
        appointmentController.getAllMyAppointmentThisWeek
    );

router
    .route('/teacher/:id')
    .get(appointmentController.getAllAppointmentOfATeacher);

router
    .route('/teacher/week/:id')
    .get(appointmentController.getAllAppointmentOfATeacherThisWeek);

router
    .route('/:id')
    .get(appointmentController.getAppointment)
    .patch(restrictTo('teacher'), appointmentController.updateAppointment)
    .delete(restrictTo('teacher'), appointmentController.deleteAppointment);

module.exports = router;
