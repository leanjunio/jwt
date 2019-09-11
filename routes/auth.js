const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {

  // Validate data before creating a user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  // Check if user is already signed up
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send(`Email already exists`);
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
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error)    ;
  }
});

module.exports = router;