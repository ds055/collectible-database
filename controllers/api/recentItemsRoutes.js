const express = require('express');
const router = express.Router();
const getRecentItems = require('../../models/getRecentItems');

router.get('/', async (req, res) => {
  try {
    const recentItems = await getRecentItems();

    res.json(recentItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
