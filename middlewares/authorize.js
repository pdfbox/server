module.exports = function(req, res, next) {
    try {
        // authorize delete pdf
    } catch(err) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}