const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
        lowercase: true,
    },
    logradouro: {
        type: String,
        required: true,
    },
    numero: {
        type: String,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    uf: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    whatsapp: {
        type: String,
        required: true,
    },
    status: {
        enum:['NOVO', 'EM_ATENDIMENTO', 'CONTRATADO', 'DESISTENTE'],
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Contato', Schema)