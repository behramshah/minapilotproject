import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  import './VerticalChart.css';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    );

export default function VerticalChart({excelData}) {
  
  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total of len according each status category',
      },
    },
  };  
  
  let countRow = excelData ? excelData.length : 0;
  let statusZeroLen = 0;
  let statusOneLen = 0;
  let statusTwoLen = 0;
  
  if(countRow){
    statusZeroLen = excelData.reduce((total, item) => item.status == 0 ? total + item.len : total, 0);
    statusOneLen = excelData.reduce((total, item) => item.status == 1 ? total + item.len : total, 0);
    statusTwoLen = excelData.reduce((total, item) => item.status == 2 ? total + item.len : total, 0);
  }

  const labelZero = `Status 0 total len is ${(+statusZeroLen).toFixed(2)}`;
  const labelOne = `Status 1 total len is ${(+statusOneLen).toFixed(2)}`;
  const labelTwo = `Status 2 total len is ${(+statusTwoLen).toFixed(2)}`;
  
  const labels = [labelZero, labelOne, labelTwo];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: [statusZeroLen, statusOneLen, statusTwoLen],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='vertical-container'>
        <Bar options={options} data={data} />
    </div>
  );
}
