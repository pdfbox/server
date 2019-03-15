const Media = require('../models/media')

module.exports = function(req, res, next) {
    try {
        Media.findOne({
            _id: req.params.id
        })
        .then(result => {
            if(result.author === req.user) {
                next()
            } else {
                throw new Error(`Bad request`)
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
    } catch(err) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}