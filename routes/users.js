const { create } = require('../controllers/UsersController');

module.exports = router => {
  router.post('/register', create);
};