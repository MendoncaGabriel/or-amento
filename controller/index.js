const varejo = require('../services/index');
const Orçamento = require('../models/orcamentos');
const Empresa = require('../models/empresa')
const Cliente = require('../models/cliente')

exports.createCliente = async (req, res) => {
    const cliente = req.body

    const novoCliente = await Cliente.create(cliente);
    res.status(200).json({msg: "Cliente salvo com sucesso!", novoCliente})
}
exports.getByName = async (req, res) => {
    const nome = req.body.nome

    const cliente = await Cliente.findOne({nome: nome});
    res.status(200).json({msg: "Resgatado com sucesso!", cliente})
}

exports.criarOrcamentoPage = async (req, res) => {
    try {
    
        res.render('home', { title: 'Express' });
        
    } catch (error) {
        console.log(error)
    }

}

function formatDateTime(date) {
    // Obtém as partes da data e hora
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Formata e retorna a string no formato desejado
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

function vencimento(dateStr, daysToAdd) {
    // Cria um objeto Date a partir da string de data
    const date = dateStr; // Adiciona 'T' para tratar a data como ISO

    // Adiciona os dias à data
    date.setDate(date.getDate() + daysToAdd);

    // Obtém as partes da data e hora
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Formata e retorna a string no formato desejado
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}



exports.orcamentoPage = async (req, res) => {
    
    const id = req.params.id;
    try {
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
            somaTotal: Number(somaTotal).toFixed(2)
        });
    } catch (error) {
        console.error("Erro ao buscar orçamento:", error);
        res.status(500).render('500', { message: 'Erro interno do servidor' });
    }
}

exports.createOrcamento = async (req, res) => {
    const {produtos, formaPagamento, observacoes, cliente} = req.body

    // Verificar se usuario ja foi cadastrado
    const clienteCheck = await Cliente.findOne({nome: cliente.nome})
    if(!clienteCheck){
        await Cliente.create(cliente)
    }
   

    const novoOrcamento = await Orçamento.create({
        data: new Date(),
        items: JSON.stringify(produtos),
        formaPagamento: formaPagamento,
        observacoes: observacoes,
        cliente: JSON.stringify(cliente)
    });

    res.status(200).json({msg: "Orçamento criado com sucesso!", novoOrcamento})
}

exports.getProductByEanCode = async (req, res) => {
    const ean = req.params.ean
    if(!ean) return res.status(401).json({msg: "Ean não foi passado!"})
        
    const produto = await varejo.getProductByEan(ean);
    if(!produto) return res.status(404).json({msg: "Produto não encontrado!"})

    res.status(200).json({msg: "Produto recupedado com sucesso!", produto})
}

