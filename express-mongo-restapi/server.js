const {app} = require('./app')

const port = 7000;
app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
