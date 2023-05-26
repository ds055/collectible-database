const User = require('./User');
const ActionFigure = require('./ActionFigure')

// Write Table relationships here

User.hasMany(ActionFigure, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

ActionFigure.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, ActionFigure };
