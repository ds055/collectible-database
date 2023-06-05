const router = require('express').Router();
const { ActionFigure } = require('../../models');
const withAuth = require('../../middleware/auth');

// get all action figures
router.get('/', async (req, res) => {
  try {
    const actionFigureData = await ActionFigure.findAll();
    res.status(200).json(actionFigureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one action figure by id
router.get('/:id', async (req, res) => {
  try {
    const actionFigureData = await ActionFigure.findByPk(req.params.id);
    if (!actionFigureData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(actionFigureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new action figure
router.post('/', withAuth, async (req, res) => {
  try {
    const actionFigureData = await ActionFigure.create({
      ...req.body,
      
      user_id: req.session.user_id,
    });
    res.status(200).json(actionFigureData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update an action figure by id
router.put('/:id', async (req, res) => {
  try {
    const actionFigureData = await ActionFigure.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!actionFigureData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(actionFigureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete an action figure by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const actionFigureData = await ActionFigure.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!actionFigureData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(actionFigureData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;