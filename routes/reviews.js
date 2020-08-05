const {index, show, create, update, delete: _delete, reviewOptions, colorOptions, locationOptions, scoreOptions} = require('../controllers/ReviewsController');

function auth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: "You must authenticate bofore using this API call"});
    }
    next();
}

module.exports = router => {
    router.get('/reviews/reviewOptions', reviewOptions);
    router.get('/reviews/colorOptions', colorOptions);
    router.get('/reviews/locationOptions', locationOptions);
    router.get('/reviews/scoreOptions', scoreOptions);
    router.get('/reviews', index);
    router.post('/reviews',auth, create);
    router.post('/reviews/update',auth, update);
    router.post('/reviews/delete',auth, _delete);
    router.get('/reviews/:id', show);
};