const Yup = require('yup')
const Curso = require('../Models/Curso')

const categorias = [
	'EDUCACAO_BASICA',
	'EDUCACAO_DISTANCIA',
	'GRADUACAO',
	'POS_GRADUACAO']

module.exports = {
	async read(req, res) {
		const curso = await Curso.find();
		curso == [] ? (res.json({ message: "Não há cursos registrados." })):(res.status(200).json(curso))
	},

	async readOne(req, res) {
		const curso_id = await Curso.findById(req.params.id)
		
		curso_id == null ? (res.status(404).json("Curso não encontrado")): (res.status(200).json(curso_id))
	},

	async create(req, res) {
		const nome = req.body.nome

		const cursoSchema = Yup.object().shape({
			nome: Yup.string().required(),
			categoria: Yup.mixed().oneOf(categorias),
		})

		if (nome.length <= 4) {
			return res.status(405).json({ message: 'Nome muito curto.' })
		}

		if (!(await cursoSchema.isValid(req.body))) {
			return res.status(405).json("Algo de errado com o Nome ou a Categoria")
		}

		const cursoExistente = await Curso.findOne({ nome });

		if (cursoExistente) {
			return res.status(401).json({ message: 'Curso já existente.' })
		}

		const curso = await Curso.create(req.body);
		return res.status(201).json(curso)
	},

	async delete(req, res) {
		console.log(req.params.id)
		const curso_id = await Curso.findById(req.params.id)

		if (curso_id == null) {
			return res.status(401).json("Curso inexistente")
		}

		try {
			await Curso.findByIdAndDelete(curso_id)
		}
		catch (err) {
			return res.status(401).json("Não foi possivel apagar o curso", err)
		}

		return res.status(200).json("Curso deletado com sucesso")
	},

	async update(req, res) {
		const curso_id = await Curso.findById(req.params.id)

		if (curso_id == null) {
			return res.status(400).json("Curso inexistente")
		}

		const nome = req.body.nome

		const cursoSchema = Yup.object().shape({
			nome: Yup.string().required(),
			categoria: Yup.mixed().oneOf(categorias),
		})

		if (nome.length <= 4 || undefined) {
			return res.status(405).json({ message: 'Nome muito curto.' })
		}

		if (!(await cursoSchema.isValid(req.body))) {
			return res.status(405).json("Algo de errado com o Nome ou a Categoria")
		}

		const cursoExistente = await Curso.findOne({ nome });

		if (cursoExistente) {
			return res.status(401).json({ message: 'Curso já existente.' })
		}

		curso_id = await curso_id.updateOne(req.body)


		return res.status(200).json(curso_id)
	}
}
