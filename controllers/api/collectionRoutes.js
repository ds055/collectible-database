const router = require('express').Router();
const { Collection, CollectionActionFigure, CollectionCard, CollectionCoin, CollectionMusic } = require('../../models');
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

// delete an collection by id
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

// add card to collection
router.post('/card', withAuth, async (req, res) => {
  try {
    const CardData = await CollectionCard.create({
      ...req.body,
    });
    res.status(200).json(CardData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// remove card from collection
router.delete('/card/:id', withAuth, async (req, res) => {
  try {
    const CardData = await CollectionCard.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(CardData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add coin to collection
router.post('/coin', withAuth, async (req, res) => {
  try {
    const CoinData = await CollectionCoin.create({
      ...req.body,
    });
    res.status(200).json(CoinData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// remove coin from collection
router.delete('/coin/:id', withAuth, async (req, res) => {
  try {
    const CoinData = await CollectionCoin.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(CoinData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add music to collection
router.post('/music', withAuth, async (req, res) => {
  try {
    const MusicData = await CollectionMusic.create({
      ...req.body,
    });
    res.status(200).json(MusicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// remove music from collection
router.delete('/music/:id', withAuth, async (req, res) => {
  try {
    const MusicData = await CollectionMusic.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(MusicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;