'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2013', cases: 90 },
  { year: '2014', cases: 111 },
  { year: '2015', cases: 195 },
  { year: '2016', cases: 264 },
  { year: '2017', cases: 305 },
  { year: '2018', cases: 378 },
  { year: '2019', cases: 456 },
  { year: '2020', cases: 482 },
  { year: '2021', cases: 421 },
  { year: '2022', cases: 408 },
  { year: '2023', cases: 528 },
];

export const SecurityStatsChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis 
          dataKey="year" 
          stroke="#6b7280"
          tick={{ fill: '#9CA3AF' }}
        />
        <YAxis 
          stroke="#6b7280"
          tick={{ fill: '#9CA3AF' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '0.5rem',
          }}
          itemStyle={{ color: '#E5E7EB' }}
          labelStyle={{ color: '#9CA3AF' }}
          formatter={(value) => [`${value} casos`, 'Grooming']}
          labelFormatter={(year) => `Año ${year}`}
        />
        <Line 
          type="monotone" 
          dataKey="cases" 
          stroke="#818cf8" 
          strokeWidth={2}
          dot={{ fill: '#818cf8' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};