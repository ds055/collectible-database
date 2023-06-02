const router = require('express').Router();
const { Coin } = require('../../models');
const withAuth = require('../../middleware/auth');

// get all Coins
router.get('/', async (req, res) => {
  try {
    const CoinData = await Coin.findAll();
    res.status(200).json(CoinData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one Coin by id
router.get('/:id', async (req, res) => {
  try {
    const CoinData = await Coin.findByPk(req.params.id);
    if (!CoinData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(CoinData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new Coin
router.post('/', withAuth, async (req, res) => {
  try {
    const CoinData = await Coin.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(CoinData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a Coin by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const CoinData = await Coin.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!CoinData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(CoinData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a Coin by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const CoinData = await Coin.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!CoinData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(CoinData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;