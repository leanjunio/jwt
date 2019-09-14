require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true } ,() => console.log(`Connected to DB!`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log(`Listening on port ${3000}`));