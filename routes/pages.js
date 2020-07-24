const { home, about } = require('../controllers/PagesController');

module.exports = router => {
  router.get('/', home);
};