const varejo = require('../services/index')
const Orçamento = require('../models/orcamentos')
const Empresa = require('../models/empresa')
const Cliente = require('../models/cliente')
const Vendedor = require('../models/vendedor')

function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

function vencimento(dateStr, daysToAdd) {
    const date = dateStr;
    date.setDate(date.getDate() + daysToAdd);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

exports.createCliente = async (req, res) => {
    try {
        const cliente = req.body
        const novoCliente = await Cliente.create(cliente);
        res.status(200).json({msg: "Cliente salvo com sucesso!", novoCliente})
    } catch (error) {
        res.status(500).json({error})
    }
}

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

exports.getByName = async (req, res) => {
    try {
        const nome = req.body.nome
        const cliente = await Cliente.findOne({where: {nome: nome}});
        res.status(200).json({msg: "Resgatado com sucesso!", cliente})
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.criarOrcamentoPage = async (req, res) => {
    try {
        const vendedores = await Vendedor.findAll()
        res.render('home', { title: 'Express', vendedores });
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.orcamentoPage = async (req, res) => {
    try {
        const id = req.params.id;
        const orçamento = await Orçamento.findByPk(id);
        const empresa = await Empresa.findByPk(1);   
        const listaItems = JSON.parse(orçamento.dataValues.items)
        const somaTotal = listaItems.reduce((acc, e) => acc + parseFloat(e.total), 0);
    
        res.render('orcamento', {
            id: id,
            data: orçamento.dataValues.data,
            items: listaItems,
            createdAt: formatDateTime(orçamento.dataValues.createdAt),
            vencimento: vencimento(orçamento.dataValues.createdAt, 15),
            empresa,
            formaPagamento: orçamento.formaPagamento,
            observacoes: orçamento.dataValues.observacoes,
            cliente: JSON.parse(orçamento.dataValues.cliente),
            somaTotal: Number(somaTotal).toFixed(2),
            vendedor: JSON.parse(orçamento.dataValues.vendedor)
        });
    } catch (error) {
        res.status(500).json({error});
    }
}

exports.createOrcamento = async (req, res) => {
    try {
        const { produtos, formaPagamento, observacoes, cliente, vendedor } = req.body;
        let clienteCheck = await Cliente.findOne({ where: {nome: cliente.nome}});        
    
        if (!clienteCheck) {
            clienteCheck = await Cliente.create(cliente);
        }

        const novoOrcamento = await Orçamento.create({
            data: new Date(),
            items: JSON.stringify(produtos),
            formaPagamento: formaPagamento,
            observacoes: observacoes,
            cliente: JSON.stringify(clienteCheck),
            vendedor: JSON.stringify(vendedor.nome)
        });

        res.status(200).json({ msg: "Orçamento criado com sucesso!", novoOrcamento });
    } catch (error) {
        res.status(500).json({error});
    }
}

exports.getProductByEanCode = async (req, res) => {
    try {        
        const ean = req.params.ean
        if(!ean) return res.status(401).json({msg: "Ean não foi passado!"})
            
        const produto = await varejo.getProductByEan(ean);
        if(!produto) return res.status(404).json({msg: "Produto não encontrado!"})
    
        res.status(200).json({msg: "Produto recupedado com sucesso!", produto})
    } catch (error) {
        res.status(500).json({error})
    }
}