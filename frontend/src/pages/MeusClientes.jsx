import React, { useEffect, useState } from 'react';

const TabelaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/cliente')
            .then(response => response.json())
            .then(data => {
                // Verifique o tipo de dados recebido
                console.log('Dados recebidos:', data.clientes);
                if (Array.isArray(data.clientes)) {
                    setClientes(data.clientes);
                } else {
                    console.error('Dados recebidos não são um array:', data);
                    setError('Dados recebidos não são um array.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                setError('Erro ao buscar dados.');
            });
    }, []);

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
<section className="space-y-4 ">
    <h1 className="text-2xl font-bold drop-shadow-sm text-indigo-800 ">Clientes</h1>
    <div className="bg-white rounded-lg shadow-md   ">
        <div className="relative    p-1 overflow-auto max-h-[500px]">
            <table className="divide-y divide-gray-200 w-full   ">
                <thead className="bg-indigo-700 sticky top-0 z-10">
                    <tr>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Nome</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Telefone</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">CPF</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">CNPJ</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">CEP</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Rua</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Bairro</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Número</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Cidade</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Complemento</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {clientes.map((element, index) => element && (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.nome}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.telefone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.cpf}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.cnpj}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.cep}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.rua}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.bairro}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.numero}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.cidade}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{element.complemento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</section>



    );
};

export default TabelaClientes;
