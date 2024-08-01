import React, { useEffect, useState } from 'react';


const MeusOrcamentos = () => {
    const [orcamentos, setOrcamentos] = useState([])

    useEffect(()=>{
        fetch('/api/orcamento').then(r => r.json()).then(r => setOrcamentos(r))
        console.log(orcamentos)
    }, [])

    function formatDateTimeBR(dateString) {
        const date = new Date(dateString);
        
        // Extraindo dia, mês e ano
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são indexados a partir de 0
        const year = date.getFullYear();
        
        // Extraindo hora e minuto
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    const handleOpenOrcamento = (link) => {
        window.open(link, '_blank', 'noopener,noreferrer');
    }
      

    return (
        <section className='space-y-4'>
            <h1 className="text-2xl font-bold drop-shadow-sm text-indigo-800">Meus Orçamentos</h1>
            <div className=" bg-white rounded-lg shadow-md  overflow-x-auto">

            <table className="divide-y divide-gray-200 w-full">
    <thead className="bg-indigo-700">
        <tr>
            <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Id</th>
            <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Cliente</th>
            <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Telefone</th>
            <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Registro</th>
            <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Observações</th>
            <th className="py-3 px-4 border-b border-gray-200 text-gray-100">Total</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {orcamentos.map((element, index) => (
            <tr
                key={index}
                onClick={() => handleOpenOrcamento(`/orcamento/${element.id}`)}
                className="cursor-pointer hover:bg-gray-100"
            >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.Cliente.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.Cliente.telefone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatDateTimeBR(element.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">{element.observacoes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">{element.subtotal}</td>
            </tr>
        ))}
    </tbody>
</table>



            </div>
        </section>
    );
};

export default MeusOrcamentos;
