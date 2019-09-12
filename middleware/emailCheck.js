const User = require('../model/User');

module.exports = {
  checkEmail: async (req, res, next) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).send(`Email already exists`);
    }
    next();
  }
}