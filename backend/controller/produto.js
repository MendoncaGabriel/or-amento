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