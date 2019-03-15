const router = require('express').Router();

const Media = require('../models/media');

const images = require('../helpers/images');

const translateController = require('../controllers/translate')

const authenticate = require('../middlewares/authenticate')

const authorize = require('../middlewares/authorize')

router.use(authenticate)

router
  .post('/scan',
    translateController.translate)
  .post('/translate',
    translateController.translateX)

router
  .post('/', images.multer.single('file'),
    images.sendUploadToGCS,
    (req, res) => {
      console.log(req.user);

      (new Media({
        author: req.user,
        url: req.file.cloudStoragePublicUrl
      })).save((err, data) => {
        if (err) {
          console.log(err, "======");

          res
            .status(500)
            .json(err.message)
        } else {
          console.log(data, "===dTA");

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
        console.log(props, "===props====");

        res
          .json(props)
      })
      .catch((err) => {
        res
          .status(500)
          .json(err.message)
      })
  })
  .delete('/:id', authorize, (req, res, next) => {
    Media
      .deleteOne({
        _id: req.params.id
      })
      .then(() => {
        images.deleteFileInGCS(req.body.fileName)
        res
          .status(200)
          .json({
            message: 'file deleted'
          })
      })
      .catch(err => {
        res
          .status(500)
          .json(err.message)
      })
  });

module.exports = router;
