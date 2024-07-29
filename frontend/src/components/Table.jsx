import Price from "../utils/Price";
import Counter from "./Counter";
import { useContext } from "react";
import { ProdutoListContext } from "../providers/ProdutoList";

export default function Table() {
    const { produtos, removeProduto, incrementQuantidade, decrementQuantidade, getQuantidadeById } = useContext(ProdutoListContext);

    return (
        <table className="w-full rounded-lg overflow-hidden">
            <thead className="bg-indigo-700">
                <tr className="text-left">
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-100">ID</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Descrição</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Preço</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Quantidade</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Total</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Ações</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(item => {
                    // Verificar se o objeto price e a propriedade varejo existem
                    const priceVarejo = item?.price?.varejo || 0;
                    const quantidade = getQuantidadeById(item.productId);
                    const total = priceVarejo * quantidade;

                    return (
                        <tr key={item.productId} className="hover:bg-gray-50 text-sm">
                            <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                                {item.productId}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                                {item.descricao}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200 text-gray-700 min-w-28">
                                <Price>{priceVarejo}</Price>
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                                <Counter
                                    incrementQuantidade={incrementQuantidade}
                                    decrementQuantidade={decrementQuantidade}
                                    getQuantidadeById={getQuantidadeById}
                                    id={item.productId}
                                />
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200 text-gray-700 min-w-28">
                                <Price>{total}</Price>
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                                <button
                                    onClick={() => removeProduto(item.productId)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    Remover
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
