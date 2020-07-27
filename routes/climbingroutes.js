const {index, show, new: _new, create, edit, update, delete: _delete} = require('../controllers/ClimbingroutesController');

function auth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: "You must authenticate bofore using this API call"});
    }
    next();
}

module.exports = router => {
    router.get('/climbingroutes', index);
    router.get('/climbingroutes/new',auth, _new);
    router.post('/climbingroutes',auth, create);
    router.post('/climbingroutes/update',auth, update);
    router.post('/climbingroutes/delete',auth, _delete);
    router.get('/climbingroutes/:id/edit',auth, edit);
    router.get('/climbingroutes/:id', show);
};