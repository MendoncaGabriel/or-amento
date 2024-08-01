// BudgetChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { day: 'Seg', count: 5 },
  { day: 'Ter', count: 3 },
  { day: 'Qua', count: 8 },
  { day: 'Qui', count: 6 },
  { day: 'Sex', count: 7 },
  { day: 'Sáb', count: 4 },
  { day: 'Dom', count: 2 },
];

const Comissao = () => {
  return (
    <div className='space-y-4 h-full flex flex-col justify-between items-center'>
        <h1 className="text-2xl font-bold drop-shadow-sm text-indigo-800 w-full text-left">Orçamentos Gerados por Dia</h1>
        <h1 className="text-2xl font-bold drop-shadow-sm text-red-800 w-full text-left">Funcionalidade Inoperante</h1>


      <BarChart width={900} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Comissao;
