const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const { registerValidation, loginValidation } = require('../validation');

// Custom middleware for checking whether email already exists
const middlewares = require('../middleware/checks');

router.post('/register',
  middlewares.checkEmail,
  async (req, res) => {

  // Validate data before creating a user
  const { error } = registerValidation(req.body);
  if (error) {  
    return res.status(400).send(error.details[0].message);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  // Attempt to save the created user to DB
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error)    ;
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Checking if the email already exists in the db
  const user =  await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send(`Email cannot be found.`);
  }

  // Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
  // res.send('Logged In!');
});

module.exports = router;