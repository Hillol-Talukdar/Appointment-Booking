const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const tokenHelper = require('../../helpers/token');
const User = require('../../models/user/user.model');

const signup = catchAsync(async (req, res, next) => {
    if (req.body.role === 'admin') {
        delete req.body.role;
    }

    if (req.body.role === 'student') {
        req.body.isActivated = false;
    }

    const newUser = await User.create(req.body);

    if (req.body.role === 'student') {
        res.status(201).json({
            status: 'success',
            message: 'need admin approve',
        });
    } else {
        createSendToken(newUser, 201, res);
    }
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new AppError('email or password missing!', 401));

    const user = await User.findOne({ email, isActivated: true }).select(
        '+password'
    );

    if (!user) return next(new AppError('Incorrect email or password!', 401));

    const isMatch = await matchPassowrd(password, user.password);

    if (!isMatch)
        return next(new AppError('Incorrect email or password!', 401));

    createSendToken(user, 200, res);
});

const logout = (req, res) => {
    return res.status(202).clearCookie('token').send({
        status: 'Success',
        message: 'Token deleted',
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = tokenHelper.generateAccessToken(user._id, user.role);
    const timeLimit = 31536000000; // one year

    const cookieOptions = {
        expires: new Date(Date.now() + timeLimit),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('token', token, cookieOptions);

    user.password = undefined; // hide the user password

    res.status(statusCode).json({
        status: 'success',
        user,
        token,
    });
};

const matchPassowrd = async function (candidatePassword, userPassword) {
    return (isMatch = await bcrypt.compare(candidatePassword, userPassword));
};

module.exports = {
    signup,
    login,
    logout,
};
