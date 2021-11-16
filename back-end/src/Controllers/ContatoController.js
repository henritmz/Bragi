const Yup = require("yup")
const Contato = require('../Models/Contato')

module.exports = {
    async read(req, res){
        const contato = await Contato.find();
        contato == [] ? res.json({ message: "Não há contatos registrados." }):res.status(200).json(contato)
    },

    async readOne(req, res) {
		const curso_id = await Curso.findById(req.params.id)
		if (curso_id == null) {
			return res.status(404).json("Contato não encontrado")
		}
		return res.status(200).json(curso_id)
	},

    async create(req, res){
        const nome = req.body.nome
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        const whatsapp = req.body.whatsapp

        const contatoSchema = Yup.object().shape({
            nome: Yup.string().required(),
            cpf: Yup.string().required(),
            cep: Yup.string(),
            logradouro: Yup.string(),
            numero: Yup.string(),
            bairro: Yup.string(),
            cidade: Yup.string(),
            uf: Yup.string(),
            email: Yup.string().email().required(),
            telefone: Yup.number().required(),
            whatsapp: Yup.number().required(),
            status: Yup.mixed().oneOf(['NOVO', 
            'EM_ATENDIMENTO',
            'CONTRATADO',
            'DESISTENTE']),               
        })

        if( typeof nome !== "string"){
            return res.status(400).json({ message: 'Nome incorreto.'})
        }
        if (!(await contatoSchema.isValid(req.body))){
            return res.status(400).json("Algo de errado com os dados fornecidos")
        }

        const contatoExistente = await Contato.findOne({where: {telefone}, where: {cpf}, where: {email}, where: {whatsapp} });

        if (contatoExistente){
            return res.status(400).json('Contato já existente')
        }

        const contato = await Contato.create(req.body);
        return res.status(201).json(contato)
    },

    async delete(req, res){
        const contato_id = await Contato.findById(req.params.id)
        
		try {
			await Contato.findByIdAndDelete(contato_id)
		}
		catch (err) {
			return res.status(401).json("Não foi possivel apagar o Contato", err)
		}
		return res.status(200).json("Contato deletado com sucesso")
	},

    async update(req, res){
        let contato = await Contato.findById(req.params.id)

        if (contato == null){
            return res.status(400).json("Contato inválido")
        }

        const contatoSchema = Yup.object().shape({
            nome: Yup.string().required(),
            cpf: Yup.string().required(),
            cep: Yup.string(),
            logradouro: Yup.string(),
            numero: Yup.string(),
            bairro: Yup.string(),
            cidade: Yup.string(),
            uf: Yup.string(),
            email: Yup.string().email().required(),
            telefone: Yup.number().required(),
            whatsapp: Yup.number().required(),
            status: Yup.mixed().oneOf(['NOVO', 
            'EM_ATENDIMENTO',
            'CONTRATADO',
            'DESISTENTE']),               
        })

        if (!(await contatoSchema.isValid(req.body))){
            return res.status(400).json("Algo de errado com os dados fornecidos")
        }

        contato = await contato.updateOne(req.body)
        return res.status(200).json(contato)
    }
}