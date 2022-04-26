const Appointment = require('../../models/appointment/appointment.model');
const Availability = require('../../models/availability/availability.model');
const catchAsync = require('../../utils/catchAsync');
const Factory = require('../handlers/handlerFactory');
const AppError = require('../../utils/appError');

const addAppointment = catchAsync(async (req, res, next) => {
    req.body.status = 'pending';
    const doc = await Appointment.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: doc,
    });
});

const getAppointment = Factory.getOne(Appointment);

const getAllAppointment = catchAsync(async (req, res) => {
    let doc = await Appointment.find({})
        .populate({ path: 'teacher', select: 'name email' })
        .populate({ path: 'student', select: 'name email' });

    res.status(200).json(doc);
});

const updateAppointment = catchAsync(async (req, res, next) => {
    const doc = await Appointment.findOneAndUpdate(
        { _id: req.params.id, teacher: req.user._id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!doc) {
        return next(new AppError('No document found with that id', 404));
    }

    if (req.body.status === 'accepted') {
        const availabilityDoc = await Availability.findOneAndRemove({
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            teacher: req.body.teacher,
        });
    }

    res.status(200).json({
        status: 'Success',
        data: {
            doc,
        },
    });
});

const deleteAppointment = catchAsync(async (req, res, next) => {
    const doc = await Appointment.findByOneAndRemove({
        _id: req.params.id,
        teacher: req.user._id,
    });

    if (!doc) {
        return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});

const getAllMyAppointment = catchAsync(async (req, res, next) => {
    let query = Appointment.find({
        $or: [{ teacher: req.user._id }, { student: req.user._id }],
    })
        .populate({ path: 'teacher', select: 'name email' })
        .populate({ path: 'student', select: 'name email' })
        .sort('-createdAt');

    const doc = await query;

    res.status(200).json(doc);
});

const getAllMyAppointmentThisWeek = catchAsync(async (req, res, next) => {
    let today = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);

    let query = Appointment.find({
        $or: [{ teacher: req.user._id }, { student: req.user._id }],
        startTime: { $gte: today },
        endTime: { $lte: endDate },
        status: 'accepted',
    })
        .populate({ path: 'teacher', select: 'name email' })
        .populate({ path: 'student', select: 'name email' })
        .sort('-createdAt');

    const doc = await query;

    res.status(200).json(doc);
});

const getAllAppointmentOfATeacher = catchAsync(async (req, res, next) => {
    let query = Appointment.find({ teacher: req.params.id })
        .populate({ path: 'teacher', select: 'name email' })
        .populate({ path: 'student', select: 'name email' })
        .sort('-createdAt');

    const doc = await query;

    res.status(200).json(doc);
});

const getAllAppointmentOfATeacherThisWeek = catchAsync(
    async (req, res, next) => {
        let today = new Date();
        let endDate = new Date();
        endDate.setDate(endDate.getDate() + 6);

        let query = Appointment.find({
            teacher: req.params.id,
            startTime: { $gte: today },
            endTime: { $lte: endDate },
            status: 'accepted',
        })
            .populate({ path: 'teacher', select: 'name email' })
            .populate({ path: 'student', select: 'name email' })
            .sort('-createdAt');

        const doc = await query;

        res.status(200).json(doc);
    }
);

module.exports = {
    addAppointment,
    getAppointment,
    getAllAppointment,
    getAllMyAppointmentThisWeek,
    updateAppointment,
    deleteAppointment,
    getAllMyAppointment,
    getAllAppointmentOfATeacher,
    getAllAppointmentOfATeacherThisWeek,
};
