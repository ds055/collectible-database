const router = require('express').Router();
const withAuth = require('../../middleware/auth');
const upload = require('../../config/multer');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

// upload an image
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('/api/images/upload')
    console.log(req.file);

    const cloudImgData = await cloudinary.uploader.upload('./uploads/' + req.file.filename);

    fs.unlinkSync(`./uploads/${req.file.filename}`);

    const imgUrl = cloudImgData.url;

    console.log(imgUrl);



    res.status(200).json('file added');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;