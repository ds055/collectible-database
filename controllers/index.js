const router = require('express').Router();

const apiRoutes = require('./api');
const pageRouts = require('./pages');

router.use('/api', apiRoutes);
router.use('/', pageRouts);

module.exports = router;
