const { Model, DataTypes, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class CollectionMusic extends Model {}

CollectionMusic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Music',
      validate: {
        equals: "Music"
      }
    },
    music_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'music',
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
    modelName: 'collection_music',
  }
);

module.exports = CollectionMusic;
