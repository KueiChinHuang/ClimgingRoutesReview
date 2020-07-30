const { create, delete: _delete } = require('../controllers/SessionsController');

module.exports = router => {
  router.post('/authenticate', create);
  router.get('/logout', _delete);
};