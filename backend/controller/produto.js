const {getProductByEan} = require('../services/index')

exports.getProductByEanCode = async (req, res) => {
    try {
        const ean = req.params.ean;

        if (!ean) {
            return res.status(401).json({ msg: "EAN não foi passado!" });
        }

        let produto = [];
        try {
            produto = await getProductByEan('0' + ean);
        } catch (error) {
            // Tenta buscar o produto sem o '0' prefixo, se a primeira tentativa falhar
            try {
                produto = await getProductByEan(ean);
            } catch (innerError) {
                // Se a segunda tentativa também falhar, retorna erro
                return res.status(404).json({ msg: "Produto não encontrado!" });
            }
        }

        // Verifica se o produto foi encontrado
        if (!produto) {
            return res.status(404).json({ msg: "Produto não encontrado!" });
        }

        res.status(200).json({ msg: "Produto recuperado com sucesso!", produto });
    } catch (error) {
        res.status(500).json({ error: error.message || "Erro interno do servidor" });
    }
}
