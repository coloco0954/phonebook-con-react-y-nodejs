const Person = require('../models/Person')

class PersonController {
    static async getAll(req, res, next) {
        try {
            const persons = await Person.find({})

            res.json(persons)
        } catch (error) {
            next(error)
        }
    }

    static async showInfo(req, res) {
        const date = new Date()
        res.send(`<p>Phonebook has info for persons</p> ${date}`)
    }

    static async getById(req, res, next) {
        try {
            const id = req.params.id

            const person = await Person.findById(id)

            if (!person) {
                return res.status(404).json({ error: 'person not found' })
            }

            res.status(200).json(person)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {

        try {
            const id = req.params.id
            const person = req.body

            if (!person) {
                return res.status(400).json({ message: 'req.number is missing' })
            }

            const newPersonNumber = {
                number: person.number
            }

            const result = await Person.findByIdAndUpdate(id, newPersonNumber, { new: true })

            if (!result) {
                return res.status(404).json({ error: 'person not found' })
            }

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id

            const person = await Person.findById(id)

            if (!person) {
                return res.status(404).json({ error: 'person not found' })
            }

            await Person.findByIdAndDelete(id)
            res.status(200).json(person)

        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {

        try {
            const person = req.body

            if (!person || !person.name || !person.number) {
                return res.status(400).json({ error: 'req.name or req.number is missing' })
            }

            const newPerson = new Person({
                name: person.name,
                number: person.number
            })

            const saveNewPerson = await newPerson.save()
            res.status(201).json(saveNewPerson)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = PersonController