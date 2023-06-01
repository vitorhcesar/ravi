import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

export default function BarChart({chartData}){
    return <Bar data={chartData} options={{backgroundColor: '#1989AC', color: '#FCFCFC', borderColor: '#1989AC', hoverBackgroundColor: '#DA4167'}} />;
}
