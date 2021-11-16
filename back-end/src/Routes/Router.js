const { Router } = require('express')

const CursoController = require('../Controllers/CursoController')
const ContatoController = require('../Controllers/ContatoController')

const routes = Router()

routes.get('/cursos', CursoController.read)
routes.get('/cursos/id=:id', CursoController.readOne)
routes.post('/cursos', CursoController.create)
routes.put('/cursos/id=:id', CursoController.update)
routes.delete('/cursos/id=:id', CursoController.delete)

routes.get('/contatos', ContatoController.read)
routes.get('/contatos/id=:id', ContatoController.readOne)
routes.post('/contatos', ContatoController.create)
routes.put('/contatos/id=:id', ContatoController.update)
routes.delete('/contatos/id=:id', ContatoController.delete)

module.exports = routes