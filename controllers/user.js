const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        User.create({
            ...req.body
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(result => {
            if(result && bcrypt.compare(req.body.password, result.password)) {
                const payload = {
                    email: result.email
                }
                const access_token = jwt.sign(payload)
                res.status(200).json({
                    access_token
                })
            } else {
                res.status(400).json({
                    message: 'Wrong email/password'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static list(req, res) {
        User.find({})
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController