const sequelize = require('../config/connection');
const { User, ActionFigure } = require('../models');

const userData = require('./userData.json');
const actionFigureData = require('./figuresData.json')

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

  process.exit(0);
};

seedDatabase();
