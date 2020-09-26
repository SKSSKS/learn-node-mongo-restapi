const dotenv = require('dotenv');
const mongoose = require('mongoose');

// to add config file NOTE: must place this confic before app import, order matter
dotenv.config({ path: './config.env' });

const { app } = require('./app');

const { PORT, DATABASE, DATABASE_LOCAL, DATABASE_PASSWORD } = process.env;
const databaseUrl = DATABASE_LOCAL //DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((/*con*/) => {
    // console.log('=>>>>>>>>>>>>', con.connections);
    console.log('DB connection established');
  });

app.listen(PORT, () => {
  console.log(`Server started on http://127.0.0.1:${PORT}`);
});
