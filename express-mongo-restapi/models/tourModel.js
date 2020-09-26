const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have group size']
  },
  difficulty: {
    type: String,
    required: [true, 'Attour must have difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity : {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true
  },
  description: {
     type: String,
     trim: true,
     required: [true, 'A tour must have description']
  },
  imageCover: {
    type: String,
    required: [true, "a tour must have cover image"]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

// NOTE cretaing model using tour schema
const Tour = mongoose.model('Tours', tourSchema);

module.exports = { Tour };
