/* 
const express = require('express');
const router = express.Router();
const { Card, ActionFigure, Coin, Music } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Initiate all queries
    const cardPromise = Card.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    const figurePromise = ActionFigure.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    const coinPromise = Coin.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    const musicPromise = Music.findAll({ order: [['createdAt', 'DESC']], limit: 10 });

    // Wait for all queries to complete
    const [recentCards, recentFigures, recentCoins, recentMusic] = await Promise.all([cardPromise, figurePromise, coinPromise, musicPromise]);

    let recentItems = [...recentCards, ...recentFigures, ...recentCoins, ...recentMusic];
    recentItems.sort((a, b) => b.createdAt - a.createdAt);
    recentItems = recentItems.slice(0, 10);

    res.json(recentItems.map(item => item.get({ plain: true })));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
 */
/* 
const express = require('express');
const router = express.Router();
const { Card, ActionFigure, Coin, Music } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const recentCards = await Card.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    const recentFigures = await ActionFigure.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    const recentCoins = await Coin.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    const recentMusic = await Music.findAll({ order: [['createdAt', 'DESC']], limit: 10 });

    let recentItems = [...recentCards, ...recentFigures, ...recentCoins, ...recentMusic];
    recentItems.sort((a, b) => b.createdAt - a.createdAt);  // Sorts items by descending createdAt timestamp
    recentItems = recentItems.slice(0, 10);  // Gets the top 10 recent items across all collections

    res.json(recentItems.map(item => item.get({ plain: true })));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
 */

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
