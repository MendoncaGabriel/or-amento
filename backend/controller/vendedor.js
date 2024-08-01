const Vendedor = require('../models/vendedor')

exports.checkVendedor = async (req, res) => {
    try {
        const {vendedorId, senha} = req.body
        const vendedor = await Vendedor.findByPk(vendedorId);
        if(!vendedor) return res.status(404).json({msg: "Vendedor não encontrado!"})
        if(senha != vendedor.dataValues.senha) return res.status(401).json({msg: "Senha incorreta!"})
        res.status(200).json({msg: "Autorizado!", vendedor})
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.getVendedores = async (req, res) => {
    try {

        const vendedores = await Vendedor.findAll({attributes: ["id", "nome"]});
        if(!vendedores) return res.status(404).json({msg: "Vendedor não encontrado!"})

        res.status(200).json({vendedores})
    } catch (error) {
        res.status(500).json({error})
    }
}