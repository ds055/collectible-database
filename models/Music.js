const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Music extends Model {}

//  Format (LP, Vinyl, CD, Album, EP, etc.): not null -- ENUM define own types in SQL: Only choose from certain options that are previously defined 
// -- work around with drop down menu

Music.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
    },
    album_name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [0, 40]
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [0, 40]
      }
    },
    release_year: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 9999
        }
    }, 
    barcode: {
        type: DataTypes.INTEGER,
        validate: {
          len: [0, 15]
        }
    },
    price: {
        type: DataTypes.INTEGER,
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
