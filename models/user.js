const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')

let userSchema = new Schema({
    email: {
        type: String,
        validate: [
            {
                validator: function(value) {
                    return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value)
                },
                message: 'Invalid email'
            },
            {
                validator: function(value) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: value
                    })
                    .then(data => {
                        if(data.length !== 0) {
                            return false
                        }
                    })
                    .catch(err => {
                        return err.message
                    })
                },
                message: 'Email has been used'
            }
        ]
    },
    password: String
})

userSchema.pre('validate', function(next) {
    this.password = bcrypt.hash(this.password)
    this.email = this.email.toLowerCase()
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User