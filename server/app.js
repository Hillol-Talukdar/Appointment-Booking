const express = require('express');
const middlewares = require('./middlewares');
const router = require('./routes');
const db = require('./database');
const globalErrorHandler = require('./controllers/handlers/errorController');
const AppError = require('./utils/appError');

require('dotenv').config({ silent: true });

const app = express();

app.use(...middlewares);

db.connectMongoLocal();

router.registerApplicationRoutes(app);

app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
