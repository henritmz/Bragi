const { Router } = require('express')

const CursoController = require('../Controllers/CursoController')

const routes = Router()

routes.get('/cursos', CursoController.read)
routes.post('/cursos', CursoController.create)
routes.delete('/cursos/id=:id', CursoController.delete)
routes.get('/cursos/id=:id', CursoController.readyOne)
routes.put('/cursos/id=:id', CursoController.update)

// routes.get('/contatos', ContatoController.index)
// routes.get('/contatos/:id', ContatoController.show)
// routes.post('/contatos', ContatoController.store)
// routes.put('/contatos/:id', ContatoController.update)
// routes.delete('/contatos/:id', ContatoController.delete)

module.exports = routes