const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Cards extends Model {}

Cards.init(
  {
    id: {
        type: DataTypes.INT,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [0, 40]
      }
    },
    series: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 40]
        }
    }, 
    set: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      }
    }, 
    subtype: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 40]
        }
    },
    holographic: {
      type: DataTypes.BOOLEAN,
    },
    manufacturer: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 40]
        }
    },
    release_year: {
        type: DataTypes.INT,
        validate: {
          min: 0,
          max: 9999
        }
    }, 
    condition: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      }
    },
    price: {
        type: DataTypes.INT,
        validate: {
          len: [0, 10]
        }
    },
    image: {
        type: DataTypes.STRING,
    }
  },
  {
    sequelize
  }
);

module.exports = Cards;
