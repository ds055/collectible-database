const router = require('express').Router();
const { Collection, CollectionActionFigure, CollectionCard, CollectionCoin, CollectionMusic, ActionFigure, Coin, Card, Music } = require('../../models');
const withAuth = require('../../middleware/auth');

// get all collection
router.get('/', async (req, res) => {
  try {
    const collectionData = await Collection.findAll();
    res.status(200).json(collectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's collections by give type
router.get('/user/:type', async (req, res) => {
  try{
    const collections = await Collection.findAll({
      where: {
        user_id: req.session.user_id,
        collection_type: req.params.type
      }
    })
    res.status(200).json(collections)
  } catch (err) {
    res.status(500).json(err);
  }
}
)

// create a new collection
router.post('/', withAuth,  async (req, res) => {
  try {
    const collectionData = await Collection.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(collectionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update an collection by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const collectionData = await Collection.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!collectionData) {
      res.status(404).json({ message: 'No collection found with that id!' });
      return;
    }
    res.status(200).json(collectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a collection by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const collectionData = await Collection.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!collectionData) {
      res.status(404).json({ message: 'No collection found with that id!' });
      return;
    }
    res.status(200).json(collectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get collection-figure id
router.get('/fig/:figid/:collid', async (req, res) => {
  try {
    const CollectionFigureData = await CollectionActionFigure.findOne({
      where: {
        action_figure_id: req.params.figid,
        collection_id: req.params.collid
      }
    });
    res.status(200).json(CollectionFigureData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add figure to collection
router.post('/fig', async (req, res) => {
  try {
    const CollectionFigureData = await CollectionActionFigure.create({
      ...req.body,
    });
    res.status(200).json(CollectionFigureData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// remove figure from collection
router.delete('/fig/:id', withAuth, async (req, res) => {
  try {
    const CollectionFigureData = await CollectionActionFigure.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(CollectionFigureData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get collection-card id
router.get('/card/:cardid/:collid', async (req, res) => {
  try {
    const collectionCardData = await CollectionCard.findOne({
      where: {
        card_id: req.params.cardid,
        collection_id: req.params.collid
      }
    });
    res.status(200).json(collectionCardData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add card to collection
router.post('/card', withAuth, async (req, res) => {
  try {
    const cardData = await CollectionCard.create({
      ...req.body,
    });
    res.status(200).json(cardData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// remove card from collection
router.delete('/card/:id', withAuth, async (req, res) => {
  try {
    const cardData = await CollectionCard.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(cardData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get collection-card id
router.get('/coin/:coinid/:collid', async (req, res) => {
  try {
    const collectionCoinData = await CollectionCoin.findOne({
      where: {
        coin_id: req.params.coinid,
        collection_id: req.params.collid
      }
    });
    res.status(200).json(collectionCoinData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// add coin to collection
router.post('/coin', withAuth, async (req, res) => {
  try {
    const coinData = await CollectionCoin.create({
      ...req.body,
    });
    res.status(200).json(coinData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// remove coin from collection
router.delete('/coin/:id', withAuth, async (req, res) => {
  try {
    const coinData = await CollectionCoin.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(coinData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get collection-card id
router.get('/music/:musicid/:collid', async (req, res) => {
  try {
    const collectionMusicData = await CollectionMusic.findOne({
      where: {
        music_id: req.params.musicid,
        collection_id: req.params.collid
      }
    });
    res.status(200).json(collectionMusicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add music to collection
router.post('/music', withAuth, async (req, res) => {
  try {
    const musicData = await CollectionMusic.create({
      ...req.body,
    });
    res.status(200).json(musicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// remove music from collection
router.delete('/music/:id', withAuth, async (req, res) => {
  try {
    const musicData = await CollectionMusic.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(musicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
// get one collection by id
router.get('/:id', async (req, res) => {
  try {
    const collectionData = await Collection.findByPk(req.params.id);
    if (!collectionData) {
      res.status(404).json({ message: 'No collection found with that id!' });
      return;
    }
    res.status(200).json(collectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});