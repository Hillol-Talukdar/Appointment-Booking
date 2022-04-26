const express = require('express');
const router = express.Router();
const availabilityController = require('../../controllers/availability/availability.controller');
const checkAuth = require('../../middlewares/checkAuth');
const restrictTo = require('../../middlewares/restrictTo');

router.use(checkAuth);

router
    .route('/')
    .post(restrictTo('teacher'), availabilityController.addAvailability)
    .get(availabilityController.getAllAvailability);

router
    .route('/my')
    .get(restrictTo('teacher'), availabilityController.getAllMyAvailability);

router
    .route('/my/week')
    .get(
        restrictTo('teacher'),
        availabilityController.getAllMyAvailabilityThisWeek
    );

router
    .route('/teacher/:id')
    .get(availabilityController.getAllAvailabilityOfATeacher);

router
    .route('/teacher/week/:id')
    .get(availabilityController.getAllAvailabilityOfATeacherThisWeek);

router
    .route('/:id')
    .get(availabilityController.getAvailability)
    .patch(restrictTo('teacher'), availabilityController.updateAvailability)
    .delete(restrictTo('teacher'), availabilityController.deleteAvailability);

module.exports = router;
