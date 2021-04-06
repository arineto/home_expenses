import React from 'react';
import { forEach, has, toNumber, map, keys, sortBy, reverse } from 'lodash';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ expenses }) => {
  const chartDataByUser = {};
  forEach(expenses, entry => {
    if (!has(chartDataByUser, entry.category.name)) {
      chartDataByUser[entry.category.name] = 0;
    }
    chartDataByUser[entry.category.name] += toNumber(entry.value);
  })

  const chartData = reverse(sortBy(map(keys(chartDataByUser), category => ({
    name: category, value: chartDataByUser[category]
  })), ['value']));

  return (
    <div style={{height: "400px"}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width="100%"
          height={400}
          data={chartData}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


export default BarChartComponent;
