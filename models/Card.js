const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
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
      validate: {
        len: [0, 40]
      },
    },
    release_year: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 9999
      },
    },
    series: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    }, 
    set: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    }, 
    subtype: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    },
    holographic: {
      type: DataTypes.BOOLEAN,
    },
    manufacturer: {
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
    modelName: 'card'
  }
);

module.exports = Card;
