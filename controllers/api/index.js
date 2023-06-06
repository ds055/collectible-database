const router = require('express').Router();
const userRoutes = require('./userRoutes');
const actionFigureRoutes = require('./actionFigureRoutes');
const coinRoutes = require('./coinRoutes');
const musicRoutes = require('./musicRoutes');
const cardRoutes = require('./cardRoutes');
const collectionRoutes = require('./collectionRoutes');
const imageUploadRoutes = require('./image-upload');

router.use('/users', userRoutes);
router.use('/actionfigure', actionFigureRoutes);
router.use('/coin', coinRoutes);
router.use('/music', musicRoutes);
router.use('/card', cardRoutes);
router.use('/collection', collectionRoutes);
router.use('/images', imageUploadRoutes);

module.exports = router;
