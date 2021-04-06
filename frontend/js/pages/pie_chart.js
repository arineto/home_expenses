import React from 'react';
import { forEach, has, toNumber, map, keys } from 'lodash';
import { Legend, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3d5a80', '#ee6c4d'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

const PieChartComponent = ({ expenses }) => {
  const chartDataByUser = {};
  forEach(expenses, entry => {
    if (!has(chartDataByUser, entry.user.email)) {
      chartDataByUser[entry.user.email] = 0;
    }
    chartDataByUser[entry.user.email] += toNumber(entry.value);
  });

  const chartData = map(keys(chartDataByUser), email => ({
    name: email,
    value: chartDataByUser[email],
  }));

  return (
    <div style={{ height: '350px', marginTop: '-15px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width="100%" height="100%">
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
