const { model } = require('mongoose')

const personsSchema = require('../schema/persons')

const Person = model('Person', personsSchema)


// Ejemplo de uso
// Person.find({}).then(result => {
//     console.log('Phonebook')
//     result.map(person => {
//         console.log(`-${person.name} ${person.number}`)
//     })
//     mongoose.connection.close()
// })
// .catch(error => {
//     console.log(error)
// })

// const person = new Person({
//     name: 'Juan',
//     number: 3123321
// })

// person.save()
//     .then(result => {
//         console.log(`added ${result.name} number ${result.number} to phonebook`)
//         mongoose.connection.close()
//     })
//     .catch(error => {
//         console.log(error)
//     })

module.exports = Person