const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    categoria: {
        enum:['EDUCACAO_BASICA', 'GRADUACAO', 'POS_GRADUACAO', 'EDUCACAO_DISTANCIA'],
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Cursos', Schema)