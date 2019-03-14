const router = require('express').Router();

const Media = require('../models/media');

const images = require('../helpers/images');

router
  .post('/', images.multer.single('file'),
    images.sendUploadToGCS,
    (req, res) => {
      (new Media({
        url: req.file.cloudStoragePublicUrl
      })).save((err, data) => {
        if (err) {
          res
            .status(500)
            .json(err.message)
        } else {
          res
            .status(201)
            .json(data)
        }
      });
    })
  .get('/', (req, res, next) => {
    Media
      .find()
      .then((props) => {
        res
          .json(props)
      })
      .catch((err) => {
        res
          .status(500)
          .json(err.message)
      })
  });

module.exports = router;