const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const routes = require('./routes');




const app = express();


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.listen(3000, () =>
  console.log('Example Hugo listening on port 3000! '),

);
