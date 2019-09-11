require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validation = require('./middleware/checkIfUserExists');
const app = express();

// Import Routes
const authRoute = require('./routes/auth');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true } ,() => console.log(`Connected to DB!`));

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json
app.use(bodyParser.json());
app.use(validation.test);

// Route middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => console.log(`Listening on port ${3000}`));