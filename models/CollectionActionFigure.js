const { Model, DataTypes, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class CollectionActionFigure extends Model {}

CollectionActionFigure.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Action Figure',
      validate: {
        equals: "Action Figure"
      }
    },
    action_figure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'action_figure',
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
    modelName: 'collection_action_figure',
  }
);

module.exports = CollectionActionFigure;
