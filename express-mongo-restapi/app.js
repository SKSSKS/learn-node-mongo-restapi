const express = require('express');
const morgan = require('morgan'); // a logging package
const {tourRouter} = require('./routes/tourRoutes')
const {userRouter} = require('./routes/userRoutes')

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */
// 1st MIIDLEWARE
app.use(morgan('dev'));
app.use(express.json()); // to put body in to req

/* -------------------------------------------------------------------------- */
/*                                     ROUTES                                 */
/* -------------------------------------------------------------------------- */
// mounting route using middleware
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = { app }