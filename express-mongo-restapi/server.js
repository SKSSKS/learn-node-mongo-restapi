const dotenv = require('dotenv')

// to add config file
dotenv.config({path: './config.env'})


const {app} = require('./app')

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
