const { Schema } = require('mongoose')

const personsSchema = new Schema({
    name: String,
    number: Number
})

personsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = personsSchema