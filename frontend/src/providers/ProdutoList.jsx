import { createContext, useState } from "react";

export const ProdutoListContext = createContext({
    addProduto: () => {},
    removeProduto: () => {},
    incrementQuantidade: () => {},
    decrementQuantidade: () => {},
    getQuantidadeById: () => {},
    produtos: []
});

export const ProdutoListProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([]);

    const addProduto = (item) => {
        setProdutos(prev => {
            // Verificar se o produto já existe
            const existingProduto = prev.find(p => p.productId === item.productId);
            if (existingProduto) {
                return prev.map(p =>
                    p.productId === item.productId
                        ? { ...p, quantidade: p.quantidade + 1 }
                        : p
                );
            }
            return [...prev, { ...item, quantidade: 1 }];
        });
    };

    const removeProduto = (id) => {
        setProdutos(prev => prev.filter(e => e.productId !== id));
    };

    const incrementQuantidade = (id) => {
        setProdutos(prev =>
            prev.map(p =>
                p.productId === id
                    ? { ...p, quantidade: p.quantidade + 1 }
                    : p
            )
        );
    };

    const decrementQuantidade = (id) => {
        setProdutos(prev =>
            prev.map(p =>
                p.productId === id
                    ? { ...p, quantidade: p.quantidade > 1 ? p.quantidade - 1 : 1 }
                    : p
            )
        );
    };

    const getQuantidadeById = (id) => {
        const produto = produtos.find(e => e.productId === id);
        return produto ? produto.quantidade : 1;
    };

    return (
        <ProdutoListContext.Provider
            value={{ addProduto, removeProduto, incrementQuantidade, decrementQuantidade, getQuantidadeById, produtos }}
        >
            {children}
        </ProdutoListContext.Provider>
    );
};
