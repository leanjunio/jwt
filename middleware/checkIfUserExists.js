const User = require('../model/User');

module.exports.checkIfUserExists = async (req, res, next) => {
  console.log(`checkIfUserExists()`);
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send(`Email already exists`);
  }
  next();
}

module.exports.test = (req, res, next) => {
  console.log(`test middleware`);
  next();
}