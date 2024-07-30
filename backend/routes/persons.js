const { Router } = require('express')
const PersonController = require('../controllers/persons')

const personsRouter = Router()

personsRouter.get('/', PersonController.getAll)

personsRouter.get('/info', PersonController.showInfo)

personsRouter.get('/:id', PersonController.getById)

personsRouter.patch('/:id', PersonController.update)

personsRouter.delete('/:id', PersonController.delete)

personsRouter.post('/', PersonController.create)

module.exports = personsRouter