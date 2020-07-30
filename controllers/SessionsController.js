const passport = require('passport');

exports.create = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      console.error(err);

      return res.status(401).json({
        status: 'failed',
        message: 'Not authorized',
        error: err
      });
    }

    return loginUser(user, req, res);
  })(req, res, next);
};

exports.delete = (req, res) => {
  req.logout();
  res.status(200).json({message: 'User was logged out successfully.'});
};

function loginUser (user, req, res) {
  req.login(user, err => {
    if (err) return res.status(401).json({
      status: 'failed',
      message: 'Not authorized',
      error: err
    });

    return res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    })
  });
}

exports.loginUser = loginUser;