const router = require('express').Router();

(require('./routes/pages'))(router);
(require('./routes/users'))(router);
(require('./routes/sessions'))(router);
(require('./routes/climbingroutes'))(router);

// Step 1: Add your resource routes to the router composer

module.exports = router;