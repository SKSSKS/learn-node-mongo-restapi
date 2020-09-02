const express = require('express');
const morgan = require('morgan'); // a logging package
const {tourRouter} = require('./routes/tourRoutes')
const {userRouter} = require('./routes/userRoutes')

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */
// 1st MIIDLEWARE

if(process.env.NODE_ENV==='development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // to put body in to req

// middleware to serve static file
app.use(express.static(`${__dirname}/public`))

/* -------------------------------------------------------------------------- */
/*                                     ROUTES                                 */
/* -------------------------------------------------------------------------- */
// mounting route using middleware
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = { app }