import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import './PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({excelData}) {

  const [chartData, setChartData] = useState(null);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    let countRow = excelData ? excelData.length : 0;

    let statusZero = 0;
    let statusOne = 0;
    let statusTwo = 0;

    if(countRow){
      statusZero = excelData.reduce((total, item) => item.status == 0 ? total + 1 : total, 0);
      statusOne = excelData.reduce((total, item) => item.status == 1 ? total + 1 : total, 0);
      statusTwo = excelData.reduce((total, item) => item.status == 2 ? total + 1 : total, 0);
    }

    const labelStatusZero = `Status 0 (${((statusZero/countRow)*100).toFixed(2)}%)`;
    const labelStatusOne = `Status 1 (${((statusOne/countRow)*100).toFixed(2)}%)`;
    const labelStatusTwo = `Status 2 (${((statusTwo/countRow)*100).toFixed(2)}%)`;

    const data = {
      labels: [labelStatusZero, labelStatusOne, labelStatusTwo],
      datasets: [
        {
          label: '# status',
          data: [statusZero, statusOne, statusTwo],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
          radius: '90%',
        },
      ],
    };
    setChartData(data);    
    setChartKey(prevKey => prevKey + 1);
}, [excelData]);


return (
    <div className='pie-container'>
      {chartData && <Pie data={chartData} key={chartKey} />}
    </div>
);
}
