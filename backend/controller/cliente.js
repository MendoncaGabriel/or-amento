const Cliente = require('../models/cliente')

exports.createCliente = async (req, res) => {
    try {
        const {nome, telefone, cpf, cnpj, cep, rua, bairro, numero, cidade, complemento} = req.body
        const novoCliente = await Cliente.create({nome, telefone, cpf, cnpj, cep, rua, bairro, numero, cidade, complemento});
        res.status(200).json({msg: "Cliente salvo com sucesso!", novoCliente})
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.getByName = async (req, res) => {
    try {
        const nome = req.body.nome
        const cliente = await Cliente.findOne({where: {nome: nome}});
        res.status(200).json({msg: "Resgatado com sucesso!", cliente})
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.getAll = async (req, res) => {
    try {
        const clientes = await Cliente.findAll()
        res.status(200).json({msg: "Resgatado com sucesso!", clientes})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}