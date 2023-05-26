const router = require('express').Router();
const { Music } = require('../../models');

// get all music
router.get('/', async (req, res) => {
  try {
    const MusicData = await Music.findAll();
    res.status(200).json(MusicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one music by id
router.get('/:id', async (req, res) => {
  try {
    const MusicData = await Music.findByPk(req.params.id);
    if (!MusicData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(MusicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new music
router.post('/', async (req, res) => {
  try {
    const MusicData = await Music.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(MusicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update music by id
router.put('/:id', async (req, res) => {
  try {
    const MusicData = await Music.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!MusicData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(MusicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete music by id
router.delete('/:id', async (req, res) => {
  try {
    const MusicData = await Music.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!MusicData) {
      res.status(404).json({ message: 'No action figure found with that id!' });
      return;
    }
    res.status(200).json(MusicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;