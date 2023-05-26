const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ActionFigure extends Model {}

ActionFigure.init(
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
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 9999
        }
    }, 
    barcode: {
        type: DataTypes.BIGINT,
        validate: {
          len: [0, 15]
        }
    },
    condition: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 40]
        }
    },
    price: {
        type: DataTypes.FLOAT,
        validate: {
          len: [0, 12]
        }
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
    modelName: 'action_figure'
  }
);

module.exports = ActionFigure;
