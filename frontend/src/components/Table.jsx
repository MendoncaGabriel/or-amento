export default function Table(){
    const data = [
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 3, item: 'Item 3', product: 'Produto C', quantity: 5, value: 15.00 },
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 3, item: 'Item 3', product: 'Produto C', quantity: 5, value: 15.00 },
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 3, item: 'Item 3', product: 'Produto C', quantity: 5, value: 15.00 },
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 3, item: 'Item 3', product: 'Produto C', quantity: 5, value: 15.00 },
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 3, item: 'Item 3', product: 'Produto C', quantity: 5, value: 15.00 },
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 3, item: 'Item 3', product: 'Produto C', quantity: 5, value: 15.00 },
        { id: 1, item: 'Item 1', product: 'Produto A', quantity: 2, value: 10.00 },
        { id: 2, item: 'Item 2', product: 'Produto B', quantity: 1, value: 20.00 },
        { id: 3, item: 'Item 3', product: 'Produto C', quantity: 5, value: 15.00 },
    ];

    const handleRemove = (id) => {
        // Função para lidar com a remoção do item
        console.log(`Remover item com ID: ${id}`);
    };


    return(
        <div className="overflow-x-auto">
            <div className="bg-white  border-gray-200 rounded-lg shadow-md">
                <div className="overflow-y-auto max-h-[470px]">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-indigo-700  border-b border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-100 font-semibold">Item</th>
                                <th className="py-3 px-4 text-left text-gray-100 font-semibold">Produto/Serviço</th>
                                <th className="py-3 px-4 text-left text-gray-100 font-semibold">Quantidade</th>
                                <th className="py-3 px-4 text-left text-gray-100 font-semibold">Valor</th>
                                <th className="py-3 px-4 text-left text-gray-100 font-semibold">Total</th>
                                <th className="py-3 px-4 text-left text-gray-100 font-semibold">Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">{item.item}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">{item.product}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">{item.quantity}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">{item.value.toFixed(2)}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                                        {(item.quantity * item.value).toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}