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
      },
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [0, 40]
      },
    },
    genre: {
      type: DataTypes.STRING, 
      validate: {
        len: [0, 40]
      },
    },
    style: {
      type: DataTypes.STRING, 
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
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 40]
      },
    }, 
    pressing_info: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      },
    },
    barcode: {
      type: DataTypes.BIGINT,
      validate: {
        len: [0, 15]
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
    modelName: 'music'
  }
);

module.exports = Music;
