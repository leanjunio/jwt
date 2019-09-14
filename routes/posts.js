const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', (req, res) => {
  res.json({ posts: {
    title: 'my first post',
    description: 'random data not to be accessed without login'
  }})
});

module.exports = router;