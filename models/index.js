const User = require('./User');
const ActionFigure = require('./ActionFigure');
const Music = require('./Music');
const Coin = require('./Coin');
const Card = require('./Card');
const Collection = require('./Collection');
const CollectionActionFigure = require('./CollectionActionFigure');
const CollectionMusic = require('./CollectionMusic');
const CollectionCoin = require('./CollectionCoin');
const CollectionCard = require('./CollectionCard');

// Write Table relationships here

User.hasMany(Collection, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

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

ActionFigure.belongsToMany(Collection, {
    through: CollectionActionFigure, foreignKey: 'action_figure_id',
});

Music.belongsTo(User, {
    foreignKey: 'user_id'
});

Music.belongsToMany(Collection, {
    through: CollectionMusic, foreignKey: 'music_id',
});

Coin.belongsTo(User, {
    foreignKey: 'user_id'
});

Coin.belongsToMany(Collection, {
    through: CollectionCoin, foreignKey: 'coin_id',
});

Card.belongsTo(User, {
    foreignKey: 'user_id'
});

Card.belongsToMany(Collection, {
    through: CollectionCard, foreignKey: 'card_id',
});

Collection.belongsTo(User, {
    foreignKey: 'user_id'
});

Collection.belongsToMany(ActionFigure, {
    through: CollectionActionFigure,
    foreignKey: 'collection_id'
});

Collection.belongsToMany(Card, {
    through: CollectionCard,
    foreignKey: 'collection_id'
});

Collection.belongsToMany(Coin, {
    through: CollectionCoin,
    foreignKey: 'collection_id'
});

Collection.belongsToMany(Music, {
    through: CollectionMusic,
    foreignKey: 'collection_id'
});

module.exports = { User, ActionFigure, Music, Coin, Card, Collection, CollectionActionFigure, CollectionCard, CollectionCoin, CollectionMusic };
