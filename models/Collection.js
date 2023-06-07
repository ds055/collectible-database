const { Model, DataTypes, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Collection extends Model {}

Collection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collection_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if(value !== "Action Figure" && value !== "Coin" && value !== "Music" && value !== "Card") {
            console.log(value)
            throw new Error("Must be an 'Action Figure', 'Coin', 'Music', or 'Card' type!")
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'collection',
  }
);

module.exports = Collection;
