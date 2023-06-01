const User = require('./User');
const ActionFigure = require('./ActionFigure');
const Music = require('./Music');
const Coin = require('./Coin');
const Card = require('./Card');

// Write Table relationships here

User.hasMany(ActionFigure, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Music, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Coin, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Card, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

ActionFigure.belongsTo(User, {
    foreignKey: 'user_id'
});

Music.belongsTo(User, {
    foreignKey: 'user_id'
});

Coin.belongsTo(User, {
    foreignKey: 'user_id'
});

Card.belongsTo(User, {
    foreignKey: 'user_id'
});




module.exports = { User, ActionFigure, Music, Coin, Card };
