const dotenv = require('dotenv');
const mongoose = require('mongoose');
const TourModel = require('../../models/tourModel')
const fs = require('fs')

// to add config file
dotenv.config({ path: `${__dirname}/../../config.env` });

const { DATABASE, DATABASE_PASSWORD, DATABASE_LOCAL } = process.env;

const databaseUrl = DATABASE_LOCAL //DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((/*con*/) => {
    console.log('DB connection established');
  });

const importData = async () => {
  try{
    // create also accepts array of object to create document
    await TourModel.Tour.create(tours)
    console.log('added data to database')
  } catch(err) {
    console.log(err)
  }
  process.exit()
}

// Delete data from data base
const deleteData = async () => {
  try{
    await TourModel.Tour.deleteMany()
    console.log('deleted data from database')
  } catch(err) {
    console.log(err)
  }
  process.exit()
}

const fun = process.argv[2]
if(fun==='importData') {
  importData()
}

if(fun==='deleteData') {
  console.log('================================================================>', fun)
  deleteData()
}

