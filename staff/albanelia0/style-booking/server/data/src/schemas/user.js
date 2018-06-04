'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        // TODO add regex
    },
    password: {
        type: String,
        required: true
    }
})