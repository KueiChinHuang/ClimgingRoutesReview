const User = require('../models/User');
const viewPath = 'users';

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New User'
  });
};

exports.create = async (req, res) => {
  const userDetails = req.body;
  req.session.flash = {};
  
  try {
    console.log(`In UsersController: ${JSON.stringify(req.body, null, 2)}`);
    const user = new User(req.body);
    await User.register(user, req.body.password);

    req.flash('success', 'The user was successfully created');
    res.redirect(`/login`);
  } catch (error) {
    console.log(`Errors: ${error}` );
    req.flash('danger', error.message);

    req.session.formData = req.body;
    res.redirect(`${viewPath}/new`);
  }
};