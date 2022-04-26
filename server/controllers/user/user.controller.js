const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../../models/user/user.model');
const catchAsync = require('../../utils/catchAsync');
const Factory = require('../handlers/handlerFactory');
const AppError = require('../../utils/appError');

const addUser = catchAsync(async (req, res, next) => {
    const {
        name,
        email,
        password,
        confirmPassword,
        studentId,
        department,
        courses,
        role,
    } = req.body;

    if (role === 'admin') {
        return next(
            new AppError(
                'You do not have permission to perform this action',
                403
            )
        );
    }

    let doesExist = await User.findOne({ email });

    if (doesExist) {
        return next(new AppError('These email already exists', 400));
    }

    const isValid = crypto.timingSafeEqual(
        Buffer.from(password),
        Buffer.from(confirmPassword)
    );

    if (!isValid) {
        return next(
            new AppError('Password and Confirm Password not matched', 401)
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        studentId,
        department,
        courses,
        role,
    });

    res.status(201).json({
        status: 'Success',
        data: newUser,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    let inputData = req.body;

    if (inputData.role && inputData.role === 'admin') {
        return next(
            new AppError(
                'You do not have permission to perform this action',
                403
            )
        );
    }

    // let doc = await User.findById(req.params.id);

    // if (!doc) {
    //     return next(new AppError('No document found with that id', 404));
    // }

    // if (doc.role === 'admin') {
    //     return next(
    //         new AppError(
    //             'You do not have permission to perform this action',
    //             403
    //         )
    //     );
    // }

    if (inputData.password) {
        let hashedPassword = await bcrypt.hash(inputData.password, 12);
        inputData.password = hashedPassword;
    }

    doc = await User.findOneAndUpdate(
        {
            _id: req.params.id,
            $or: [{ role: 'teacher' }, { role: 'student' }],
        },
        inputData,
        {
            new: true,
        }
    );

    if (!doc) {
        return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: doc,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const doc = await User.findOneAndRemove({
        _id: req.params.id,
        $or: [{ role: 'teacher' }, { role: 'student' }],
    });

    if (!doc) {
        return next(new AppError('No document found with that id', 404));
    }

    res.status(204).json({
        status: 'Success',
    });
});

const getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: user,
    });
});

const updateMe = catchAsync(async (req, res, next) => {
    delete req.body.role;

    let inputData = req.body;

    if (inputData.password) {
        let hashedPassword = await bcrypt.hash(inputData.password, 12);
        inputData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(req.user._id, inputData, {
        new: true,
    });

    if (!user) {
        return next(new AppError('No document found with that id', 404));
    }
    res.status(200).json({
        status: 'Success',
        data: user,
    });
});

const getAllUser = catchAsync(async (req, res, next) => {
    let query = User.find({
        $or: [{ role: 'teacher' }, { role: 'student' }],
    })

        .select('-password')
        .sort('-createdAt');

    const doc = await query;

    res.status(200).json({
        status: 'Success',
        results: doc.length,
        data: doc,
    });
});
const getAllTeacher = catchAsync(async (req, res, next) => {
    let query = User.find({ role: 'teacher' })
        .select('-password')
        .sort('-createdAt');

    const doc = await query;

    // res.status(200).json({
    //     status: 'Success',
    //     results: doc.length,
    //     data: doc,
    // });
    res.status(200).json(doc);
});
const getAllStudent = catchAsync(async (req, res, next) => {
    let query = User.find({ role: 'student' })
        .select('-password')
        .sort('-createdAt');

    const doc = await query;

    // res.status(200).json({
    //     status: 'Success',
    //     results: doc.length,
    //     data: doc,
    // });
    res.status(200).json(doc);
});

const getUser = catchAsync(async (req, res, next) => {
    let query = User.findOne({ _id: req.params.id });

    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: doc,
    });
});

const matchPassowrd = async function (candidatePassword, userPassword) {
    return (isMatch = await bcrypt.compare(candidatePassword, userPassword));
};

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getAllUser,
    getAllTeacher,
    getAllStudent,
    getUser,
    getMe,
    updateMe,
};
