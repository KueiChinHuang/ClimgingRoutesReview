const User = require('../models/User');
const { loginUser } = require('./SessionsController');

exports.create = async (req, res) => {
  try {
    let user = new User(req.body);
    user = await User.register(user, req.body.password);

    return loginUser(user, req, res);
  } catch (error) {
    console.error(error);
    res.status(400).json({message: 'There was an issue while registering the user.', error});
  }
};