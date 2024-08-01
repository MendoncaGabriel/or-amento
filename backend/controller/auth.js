const Vendedor = require('../models/vendedor')

exports.login = async (req, res) => {
    try {
        const {id, password} = req.body
        if(!id) throw new Error("id não informado")

        const vendedor = await Vendedor.findByPk(id);
        if(!vendedor) throw new Error("Vendedor não encontrado!")

        if(vendedor.senha == password){
            res.status(200).json({token: "123"})
        }else{
            res.status(401).json({ error: "Senha inválida!" })
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}