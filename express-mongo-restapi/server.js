const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { app } = require('./app');

// to add config file
dotenv.config({ path: './config.env' });

const { PORT, DATABASE, DATABASE_PASSWORD } = process.env;
const databaseUrl = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log('=>>>>>>>>>>>>', con.connections);
    console.log('DB connection established');
  });

// NOTE tours schema, schem is used to define model
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
    required: [true, 'A tour must have price']
  },
});

// NOTE cretaing model using tour schema
const Tour = mongoose.model('Tours', tourSchema);

const testTour = new Tour({
  name: 'The park camper',
  price: 364,
});

testTour
  .save() // NOTE to save the data, return promise
  .then((doc) => {
    console.log('saved document>>', doc);
  })
  .catch((err) => {
    console.log('error=>>>>>>', err);
  });

app.listen(PORT, () => {
  console.log(`Server started on http://127.0.0.1:${PORT}`);
});
