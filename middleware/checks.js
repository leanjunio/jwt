const User = require('../model/User');

module.exports = {
  checkEmail: async (req, res, next) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).send(`Email already exists`);
    }
    next();
  },
  checkUser: async (req, res, next) => {
    const user =  await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send(`Email does not exist`);
    else
      return user;
    next();
  }
}