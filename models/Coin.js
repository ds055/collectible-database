const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Coin extends Model {}

Coin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    },
    denomination: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [0, 40]
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 40]
      },
    }, 
    time_period: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 40]
      },
    },
    coin_finish: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    },
    mint_mark: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    },
    design_theme: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    },
    artist: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    },
    condition: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        len: [0, 12]
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false, 
    freezeTableName: true,
    underscored: true,
    modelName: 'coin'
  }
);

module.exports = Coin;
