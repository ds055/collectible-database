const sequelize = require('../config/connection');
const { User, ActionFigure, Music, Coin, Card } = require('../models');

const userData = require('./userData.json');
const actionFigureData = require('./figuresData.json')
const musicData = require('./musicData.json')
const coinsData = require('./coinsData.json')
const cardsData = require('./cardsData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const actionfigure = await ActionFigure.bulkCreate(actionFigureData, {
    individualHooks: true, 
    returning: true
  })

  const music = await Music.bulkCreate(musicData, {
    individualHooks: true, 
    returning: true
  })

  const coins = await Coin.bulkCreate(coinsData, {
    individualHooks: true, 
    returning: true
  })

  const cards = await Card.bulkCreate(cardsData, {
    individualHooks: true, 
    returning: true
  })

  process.exit(0);
};

seedDatabase();
