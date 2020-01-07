const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
    id: String,
    text: String,
    isDone: Boolean
})

module.exports = mongoose.model('todo', todoSchema, 'todos')