const sequelize = require('../config/connection');
const { User, ActionFigure, Music, Coin, Card, Collection, CollectionActionFigure, CollectionCard, CollectionCoin, CollectionMusic } = require('../models');

const userData = require('./userData.json');
const actionFigureData = require('./figuresData.json');
const musicData = require('./musicData.json');
const coinsData = require('./coinsData.json');
const cardsData = require('./cardsData.json');
const collectionData = require('./collectionData.json');
const collectionActionFigure = require('./collectionActionFigureData.json');
const collectionCoin = require('./collectionCoinData.json');
const collectionCard = require('./collectionCardData.json');
const collectionMusic = require('./collectionMusicData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const actionfigure = await ActionFigure.bulkCreate(actionFigureData, {
    individualHooks: true, 
    returning: true
  });

  const music = await Music.bulkCreate(musicData, {
    individualHooks: true, 
    returning: true
  });

  const coins = await Coin.bulkCreate(coinsData, {
    individualHooks: true, 
    returning: true
  });

  const cards = await Card.bulkCreate(cardsData, {
    individualHooks: true, 
    returning: true
  });

  const collection = await Collection.bulkCreate(collectionData, {
    individualHooks: true, 
    returning: true
  });

  const collectfigure = await CollectionActionFigure.bulkCreate(collectionActionFigure, {
    individualHooks: true, 
    returning: true
  });

  const collectcard = await CollectionCard.bulkCreate(collectionCard, {
    individualHooks: true, 
    returning: true
  });

  const collectcoin = await CollectionCoin.bulkCreate(collectionCoin, {
    individualHooks: true, 
    returning: true
  });

  const collectmusic = await CollectionMusic.bulkCreate(collectionMusic, {
    individualHooks: true, 
    returning: true
  });

  process.exit(0);
};

seedDatabase();
