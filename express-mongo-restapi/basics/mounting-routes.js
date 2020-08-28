const express = require('express');
const morgan = require('morgan'); // a logging package

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */

// 1st MIIDLEWARE
app.use(morgan('dev'));
app.use(express.json()); // to put body in to req

const fs = require('fs');
const toursFile = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8');
const toursData = JSON.parse(toursFile);

const getAllTours = (req, res) => {
  const { requestTime } = req;
  return res.status(200).json({
    status: 'Success',
    statusCode: 200,
    requestTime,
    results: toursData.length,
    data: { tours: toursData },
  });
};

const createTour = (req, res) => {
  const newId = toursData.length + 1;
  const newTour = { id: newId, ...req.body };
  toursData.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(toursData),
    (err) => {
      return res.json({
        statusCode: 201, // created succesfully
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const tourId = +req.params.id;
  const tourData = toursData.filter((tour) => tour.id === tourId);
  res.json({
    statusCode: 200,
    status: 'Success',
    data: {
      tour: tourData,
    },
  });
};

const updateTour = (req, res) => {
  const { id } = req.params;
  const { tourName, dificullty } = req.body;
  const updatedTourData = [...toursData];
  const updatedTour = updatedTourData.filter((tour) => {
    if (+id === tour.id) {
      tour.name = tourName;
      tour.dificullty = dificullty;
      return tour;
    }
  });
  if (updatedTour.length) {
    res.status(200).json({
      status: 'Success',
      statusCode: 200,
      data: {
        tour: updatedTour,
      },
    });
  } else {
    res.status(404).json({
      error: `There is no tour with this id: ${id}`,
    });
  }
};

const deleteTour = (req, res) => {
  const { id } = req.params;
  const deletedTour = toursData.filter((tour) => +id === tour.id);

  if (deletedTour.length) {
    res.status(204).json({
      status: 'Success',
      statusCode: 204,
      data: null, //{tour: deletedTour}
    });
  } else {
    res.status(404).json({
      error: `There is no tour with this id: ${id}`,
    });
  }
};

// USER ROUTES HANDLERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    statusCode: 500,
    message: 'This route is not defined yet',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    statusCode: 500,
    message: 'This route is not defined yet',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    statusCode: 500,
    message: 'This route is not defined yet',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    statusCode: 500,
    message: 'This route is not defined yet',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    statusCode: 500,
    message: 'This route is not defined yet',
  });
};

/* -------------------------------------------------------------------------- */
/*                                     ROUTES                                 */
/* -------------------------------------------------------------------------- */

// NOTE -> MOUNTING ROUTES
const toursRoutes = express.Router()
const usersRoutes = express.Router()

// NOTE -> mounting route using middleware
app.use('/api/v1/tours', toursRoutes)
app.use('/api/v1/users', usersRoutes)


toursRoutes.route('/').get(getAllTours).post(createTour);
toursRoutes
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// USER ROUTES
usersRoutes.route('/').get(getAllUsers).post(createUser);
usersRoutes
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 7000;
app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
