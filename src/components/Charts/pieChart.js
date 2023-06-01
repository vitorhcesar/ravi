import { Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

export default function PieChart({ chartData }) {
  return <Pie data={chartData} options={{color: '#FCFCFC', backgroundColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(235, 159, 64, 1)',
    'rgba(215, 159, 64, 1)',
    'rgba(195, 159, 64, 1)',
    'rgba(175, 159, 64, 1)',
  ]}} />
}
