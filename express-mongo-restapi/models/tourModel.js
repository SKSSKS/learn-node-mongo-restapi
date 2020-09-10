const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price'],
  },
});

// NOTE cretaing model using tour schema
const TourModel = mongoose.model('Tours', tourSchema);

module.exports = { TourModel };
