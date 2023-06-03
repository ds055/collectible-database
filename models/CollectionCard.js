const { Model, DataTypes, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class CollectionCard extends Model {}

CollectionCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Card',
      validate: {
        equals: "Card"
      }
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'card',
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
    modelName: 'collection_card',
  }
);

module.exports = CollectionCard;
