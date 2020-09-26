const tourModel = require('../models/tourModel');
const { response } = require('express');
// param middleware handler function, to handle any id check, which we are doing in the handler fun.
// const checkId = (req, res, next, value) => {
//   if (!value || +value >= toursData.length) {
//     return res.status(404).json({
//       // return must required
//       statusCode: 404,
//       status: 'Error',
//       message: `There is no tour with id: ${value}`,
//     });
//   }

//   next();
// };

const aliasTop5CheapTours = (req, res, next) => {
  const {query} = req
  query.limit = 5
  query.sort = 'price,-ratingsAverage'
  query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next();
}

const checkBodyMiddleware = (req, res, next) => {
  const { name, duration, difficulty, price } = req.body;

  if (!name || !duration || !difficulty || !price) {
    return res.status(404).json({
      statusCode: 404,
      status: 'Error',
      message: `Please define {name:${name}, duration:${duration}, price:${price} and difficulty:${difficulty}} property properly`,
    });
  }
  next();
};

const getAllTours = async (req, res) => {
  try {
    // TODO: querying all the tours
    // const tours = await tourModel.Tour.find() // find all the document

    // TODO: filtering tours
    // const tours = await tourModel.Tour.find() // find all the document
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals('easy')

    // const tours = await tourModel.Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // })
    // const tours = await tourModel.Tour.find(req.query) // req.query = { duration: '5', difficulty: 'easy' }

    const queryObj = {...req.query}

  /* -------------------------------------------------------------------------- */
  /*                                1. FILTERING                                 */
  /* -------------------------------------------------------------------------- */
  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach(el => delete queryObj[el])


  /* -------------------------------------------------------------------------- */
  /*                           2. ADVANCE FILTERING                             */
  /* -------------------------------------------------------------------------- */
  // Query String with operator looks like {duration:{gte:5}, difficulty:easy, page:2, limit:20}
  // replacing gte => $gte, lte=>$lte, after leplacing it will look like = {duration:{$gte:5}, difficulty:easy, page:2, limit:20}
  // similar to mongoose query
  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`)
  queryStr = JSON.parse(queryStr)

  let query = tourModel.Tour.find(queryStr)
  
  /* -------------------------------------------------------------------------- */
  /*                                 3. SORTING                                 */
  /* -------------------------------------------------------------------------- */ 
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy) // sortBy = 'name duration rating' for sorting for multiple values
  }


  /* -------------------------------------------------------------------------- */
  /*              4. fields limiting in response, know as projecting             */
  /* -------------------------------------------------------------------------- */
  if(req.query.fields) {
    const fields = req.query.fields.split(',').join(' ')
    query = query.select(fields) // query.select('name duration rating')
  } else {
    query = query.select('-_id -__v') // query.select('name duration rating')
  }

  /* -------------------------------------------------------------------------- */
  /*                                5. pagination                               */
  /* -------------------------------------------------------------------------- */
  const page = +req.query.page || 1
  const limit = +req.query.limit || 100
  const skip = (page - 1) * limit
  query = query.skip(skip).limit(limit)

  if(req.query.page) {
    const numOfTours = await tourModel.Tour.countDocuments()
    if(skip>numOfTours) {
      throw new Error('This page does not exist')
    }
  }

  const tours = await query

    res.status(200).json({
      status: 'Success',
      statusCode: 200,
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Error',
      statusCode: 404,
      message: `${err}`
    })
  }
};

const createTour = async (req, res) => {
  try {
    // const newTourData = { id: newId, ...req.body };
    // const newTour = new TourModel({data})
    // newTour.save // to save the data

    const newTour = await tourModel.Tour.create(req.body)
    res.json({
      statusCode: 200,
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.json({
      statusCode: 404,
      status: 'Error',
      message: err.toString()
    });
  }
};

const getTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    const tour = await tourModel.Tour.findById(tourId)
    res.status(200).json({
      statusCode: 200,
      status: 'Success',
      data: { tour }
    })
  } catch(err){
    res.status(200).json({
      statusCode: 404,
      status: 'Success',
      message: err.toString()
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await tourModel.Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'Success',
      statusCode: 200,
      data: {
        tour
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Error',
      statusCode: 404,
      message: err.toString()
    })
  }

};

const deleteTour = async (req, res) => {
  
  try {
    const { id } = req.params;
    // const tour = 
    await tourModel.Tour.findByIdAndDelete(id)
    res.status(204).json({
      status: 'Success',
      statusCode: 204,
      // data: { tour }
    })
  } catch(err) {}
  res.status(404).json({
    status: 'Error',
    statusCode: 404,
    message: err.toString()
  });
};

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  // checkId,
  checkBodyMiddleware,
  aliasTop5CheapTours
};
