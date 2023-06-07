const router = require('express').Router();
const withAuth = require('../../middleware/auth');
const upload = require('../../config/multer');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');
const { Collection, ActionFigure, Card, Coin, Music } = require('../../models');

const uploadImg = async (req) => {
  try {
    const cloudImgData = await cloudinary.uploader.upload('./uploads/' + req.file.filename);

    fs.unlinkSync(`./uploads/${req.file.filename}`);

    return cloudImgData.url;

  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
};

// upload an image
router.post('/collections/:id', upload.single('file'), async (req, res) => {
  try {
    const uploadImgUrl = await uploadImg(req);

    console.log(uploadImgUrl);

    const collectionData = await Collection.update({
      image: uploadImgUrl
    }, {
      where: {
        id: req.params.id
      }
    });


    res.status(200).json('file added and collection updated');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/actionfigure/:id', upload.single('file'), async (req, res) => {
  try {
    const uploadImgUrl = await uploadImg(req);

    console.log(uploadImgUrl);

    const collectionData = await ActionFigure.update({
      image: uploadImgUrl
    }, {
      where: {
        id: req.params.id
      }
    });


    res.status(200).json('file added and collection updated');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/card/:id', upload.single('file'), async (req, res) => {
  try {
    const uploadImgUrl = await uploadImg(req);

    console.log(uploadImgUrl);

    const collectionData = await Card.update({
      image: uploadImgUrl
    }, {
      where: {
        id: req.params.id
      }
    });


    res.status(200).json('file added and collection updated');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/coin/:id', upload.single('file'), async (req, res) => {
  try {
    const uploadImgUrl = await uploadImg(req);

    console.log(uploadImgUrl);

    const collectionData = await Coin.update({
      image: uploadImgUrl
    }, {
      where: {
        id: req.params.id
      }
    });


    res.status(200).json('file added and collection updated');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/music/:id', upload.single('file'), async (req, res) => {
  try {
    const uploadImgUrl = await uploadImg(req);

    console.log(uploadImgUrl);

    const collectionData = await Music.update({
      image: uploadImgUrl
    }, {
      where: {
        id: req.params.id
      }
    });


    res.status(200).json('file added and collection updated');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;