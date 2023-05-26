const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Music extends Model {}

Music.init(
  {
    id: {
        type: DataTypes.INT,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
    },
    figure_name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [0, 40]
      }
    },
    line: {
        type: DataTypes.STRING,
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
    barcode: {
        type: DataTypes.INT,
        validate: {
          len: [0, 15]
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
    sequelize,
    timestamps: false, 
    freezeTableName: true,
    underscored: true,
    modelName: 'music'
  }
);

module.exports = Music;
