const Cliente = require('../models/cliente');
const Vendedor = require('../models/vendedor');
const Empresa = require('../models/empresa');
const {Orcamento, ProdutoOrcamento} = require('../models/orcamentos');


exports.create = async (req, res) => {
    const data = req.body;
    try {
        // Primeiro, cria um cliente para usar no orçamento
        const cliente = await Cliente.create({
            nome: data?.cliente?.nome || null,
            telefone: data?.cliente?.telefone || null,
            cpf: data?.cliente?.cpf || null,
            cnpj: data?.cliente?.cnpj || null,
            cep: data?.cliente?.cep || null,
            rua: data?.cliente?.rua || null,
            bairro: data?.cliente?.bairro || null,
            cidade: data?.cliente?.cidade || null,
            complemento: data?.cliente?.complemento || null
        });

        // Criação do orçamento
        const orcamento = await Orcamento.create({
            metodo_pagamento: data?.metodoPagamento || null,
            observacoes: data?.obs?.value || null,
            clienteId: cliente?.id,
            vendedorId: data?.user?.id,
            subtotal: data.subtotal
        });

        // Adicionar produtos ao orçamento
        for (const produto of data.produtos) {
            await ProdutoOrcamento.create({
                descricao: produto.descricao,
                price: produto.price,
                quantidade: produto.quantidade,
                total: produto.total,
                orcamentoId: orcamento.id
            });
        }

        console.log('Orçamento criado com sucesso!');
        return res.status(200).json({ msg: "Orçamento criado com sucesso!", orcamento });
    } catch (error) {
        console.error('Erro ao criar o orçamento:', error);
        return res.status(500).json({ msg: "Erro ao criar o orçamento.", error: error.message});
    }
};

exports.getAll = async (req, res) => {
    try {
        // Buscar todos os orçamentos com dados relacionados de Cliente, Vendedor e Produtos
        const orcamentos = await Orcamento.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['nome', 'telefone', 'cpf', 'cnpj', 'cep', 'rua', 'bairro', 'cidade', 'complemento']
                },
                {
                    model: Vendedor,
                    attributes: ['nome']
                },
                {
                    model: ProdutoOrcamento,
                    attributes: ['descricao', 'price', 'quantidade', 'total']
                }
            ]
        });

        return res.status(200).json(orcamentos);
    } catch (error) {
        console.error('Erro ao buscar orçamentos:', error);
        return res.status(500).json({ msg: "Erro ao buscar orçamentos.", error: error.message });
    }
}