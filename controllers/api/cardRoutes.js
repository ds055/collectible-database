const router = require('express').Router();
const { Card } = require('../../models');

// get all cards
router.get('/', async (req, res) => {
  try {
    const CardData = await Card.findAll();
    res.status(200).json(CardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one card by id
router.get('/:id', async (req, res) => {
  try {
    const CardData = await Card.findByPk(req.params.id);
    if (!CardData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(CardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new card
router.post('/', async (req, res) => {
  try {
    const CardData = await Card.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(CardData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a card by id
router.put('/:id', async (req, res) => {
  try {
    const CardData = await Card.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!CardData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(CardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a card by id
router.delete('/:id', async (req, res) => {
  try {
    const CardData = await Card.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!CardData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(CardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;