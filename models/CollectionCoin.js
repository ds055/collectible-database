const { Model, DataTypes, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class CollectionCoin extends Model {}

CollectionCoin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Coin',
      validate: {
        equals: "Coin"
      }
    },
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'coin',
        key: 'id',
      },
    },
    collection_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'collection',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'collection_coin',
  }
);

module.exports = CollectionCoin;
