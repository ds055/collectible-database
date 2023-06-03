const router = require('express').Router();
const withAuth = require('../../../middleware/auth')

const dashboard = require('./dashboardRoutes');
const collection = require('./collection');

router.use('/collection', collection);
router.use('/', dashboard);

module.exports = router;
