const express = require('express');

const router = express.Router();

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkId,
  checkBodyMiddleware
} = require('../controllers/tourController');

// router.param('id', (req, res, next, val) => {
//   console.log('Tour param id value:', val)
//   next()
// })

// params middleware
router.param('id', checkId);

router.route('/').get(getAllTours).post( checkBodyMiddleware ,createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = {
  tourRouter: router,
};
