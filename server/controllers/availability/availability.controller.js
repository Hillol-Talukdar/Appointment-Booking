const Availability = require('../../models/availability/availability.model');
const catchAsync = require('../../utils/catchAsync');
const Factory = require('../handlers/handlerFactory');
const AppError = require('../../utils/appError');

const addAvailability = Factory.createOne(Availability);

const getAvailability = Factory.getOne(Availability);

const getAllAvailability = Factory.getAll(Availability);

const updateAvailability = catchAsync(async (req, res, next) => {
    const doc = await Availability.findOneAndUpdate(
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

    res.status(200).json({
        status: 'Success',
        data: {
            doc,
        },
    });
});

const deleteAvailability = catchAsync(async (req, res, next) => {
    // console.log('AISI');
    const doc = await Availability.findOneAndRemove({
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

const getAllMyAvailability = catchAsync(async (req, res, next) => {
    let query = Availability.find({ teacher: req.user._id }).sort('-createdAt');

    const doc = await query;

    res.status(200).json(doc);
});

const getAllMyAvailabilityThisWeek = catchAsync(async (req, res, next) => {
    let today = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);

    let query = Availability.find({
        teacher: req.user._id,
        startTime: { $gte: today },
        endTime: { $lte: endDate },
    }).sort('-createdAt');

    const doc = await query;

    res.status(200).json(doc);
});

const getAllAvailabilityOfATeacher = catchAsync(async (req, res, next) => {
    let query = Availability.find({ teacher: req.params.id }).sort(
        '-createdAt'
    );

    const doc = await query;

    res.status(200).json(doc);
});

const getAllAvailabilityOfATeacherThisWeek = catchAsync(
    async (req, res, next) => {
        let today = new Date();
        let endDate = new Date();
        endDate.setDate(endDate.getDate() + 6);

        let query = Availability.find({
            teacher: req.params.id,
            startTime: { $gte: today },
            endTime: { $lte: endDate },
        }).sort('-createdAt');

        const doc = await query;

        res.status(200).json(doc);
    }
);

module.exports = {
    addAvailability,
    updateAvailability,
    deleteAvailability,
    getAllAvailability,
    getAllMyAvailability,
    getAllMyAvailabilityThisWeek,
    getAvailability,
    getAllAvailabilityOfATeacher,
    getAllAvailabilityOfATeacherThisWeek,
};
