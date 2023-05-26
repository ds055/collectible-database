const router = require('express').Router();
const userRoutes = require('./userRoutes');
const actionFigureRoutes = require('./actionFigureRoutes')

router.use('/users', userRoutes);
router.use('/actionfigures', actionFigureRoutes)

module.exports = router;
