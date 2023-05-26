const User = require('./User');
const ActionFigure = require('./ActionFigure')

// Write Table relationships here

User.hasMany(ActionFigure, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});



module.exports = { User, ActionFigure };
