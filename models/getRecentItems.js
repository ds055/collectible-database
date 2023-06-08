const { Card, ActionFigure, Coin, Music } = require('../models');

async function getRecentItems() {
  const recentCards = await Card.findAll({ order: [['createdAt', 'DESC']], limit: 12 });
  const recentFigures = await ActionFigure.findAll({ order: [['createdAt', 'DESC']], limit: 12 });
  const recentCoins = await Coin.findAll({ order: [['createdAt', 'DESC']], limit: 12 });
  const recentMusic = await Music.findAll({ order: [['createdAt', 'DESC']], limit: 12 });

  let recentItems = [...recentCards, ...recentFigures, ...recentCoins, ...recentMusic];
  recentItems.sort((a, b) => b.createdAt - a.createdAt);  // Sorts items by descending createdAt timestamp
  recentItems = recentItems.slice(0, 12);  // Gets the top 12 recent items across all collections

  return recentItems.map(item => {
    let type;
    if (item instanceof Card) {
      type = 'card';
    } else if (item instanceof ActionFigure) {
      type = 'figure';
    } else if (item instanceof Coin) {
      type = 'coin';
    } else if (item instanceof Music) {
      type = 'music';
    }
  
    return { ...item.get({ plain: true }), type };
  });
}

module.exports = getRecentItems;
