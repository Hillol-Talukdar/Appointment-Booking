const AppError = require('../../utils/appError');

const handleCastErrorDB = (error) => {
    const message = `invalid ${error.path}: ${error.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldDB = (error) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please choose another value`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors).map((el) => el.message);
    const message = `invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('invalid Token. Please log in again', 401);

const handleJWTExpiredError = () =>
    new AppError('Your Token has been expired. Please log in again', 401);

const sendErrorDev = (error, req, res) => {
    // in API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            error: error,
            stack: error.stack,
        });
    }

    // in website
    return res.status(error.statusCode).render('error', {
        title: 'Something went wrong!',
        message: error.message,
    });
};

const sendErrorProd = (error, req, res) => {
    // in API
    if (req.originalUrl.startsWith('/api')) {
        if (error.isOperational) {
            return res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }

    // in website
    if (error.isOperational) {
        return res.status(error.statusCode).render('error', {
            title: 'Something went wrong!',
            message: error.message,
        });
    }

    return res.status(error.statusCode).render('error', {
        title: 'Something went wrong!',
        message: 'Please try again later',
    });
};

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(error, req, res);
    } else {
        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        }
        if (error.code === 11000) {
            error = handleDuplicateFieldDB(error);
        }
        if (error.name === 'ValidationError') {
            error = handleValidationErrorDB(error);
        }
        if (error.name === 'JsonWebTokenError') {
            error = handleJWTError();
        }
        if (error.name === 'TokenExpiredError') {
            error = handleJWTExpiredError();
        }

        sendErrorProd(error, req, res);
    }
};
