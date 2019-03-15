const router = require('express').Router();

const Media = require('../models/media');

const images = require('../helpers/images');

const translateController = require('../controllers/translate')

const authenticate = require('../middlewares/authenticate')

router.use(authenticate)

router.post('/translate',
translateController.translate )

router
  .post('/', images.multer.single('file'),
    images.sendUploadToGCS, 
    (req, res) => {
      console.log(req.user);
      
      (new Media({
        author : req.user,
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
  });




  // router
  // .post('/', images.multer.single('file'),
  //   images.sendUploadToGCS, 
  //   (req, res) => {
  //     (new Media({
  //       url: req.file.cloudStoragePublicUrl
  //     })).save((err, data) => {
  //       if (err) {
  //         res
  //           .status(500)
  //           .json(err.message)
  //       } else {
  //         res
  //           .status(201)
  //           .json(data)
  //       }
  //     });
  //   })

module.exports = router;