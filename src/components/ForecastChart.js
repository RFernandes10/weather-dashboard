import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ForecastChart({ forecast, unit }) {
  if (!forecast.length) return null;

  const labels = forecast.map((item) => new Date(item.dt * 1000).toLocaleDateString());
  const temperatures = forecast.map((item) => item.main.temp);
  const humidities = forecast.map((item) => item.main.humidity);
  const windSpeeds = forecast.map((item) => item.wind.speed);

  const data = {
    labels,
    datasets: [
      {
        label: `Temperatura (°${unit === 'metric' ? 'C' : 'F'})`,
        data: temperatures,
        borderColor: '#64ffda',
        backgroundColor: 'rgba(100, 255, 218, 0.2)',
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Umidade (%)',
        data: humidities,
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        fill: true,
        yAxisID: 'y1',
      },
      {
        label: `Vento (${unit === 'metric' ? 'm/s' : 'mph'})`,
        data: windSpeeds,
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        fill: true,
        yAxisID: 'y2',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#fff' } },
      title: { display: true, text: 'Previsão para 5 Dias', color: '#fff' },
    },
    scales: {
      x: { ticks: { color: '#fff' } },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: `Temperatura (°${unit === 'metric' ? 'C' : 'F'})`, color: '#fff' },
        ticks: { color: '#fff' },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'Umidade (%)', color: '#fff' },
        ticks: { color: '#fff' },
        grid: { drawOnChartArea: false },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: `Vento (${unit === 'metric' ? 'm/s' : 'mph'})`, color: '#fff' },
        ticks: { color: '#fff' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg mb-6 animate-fade-in">
      <Line data={data} options={options} />
    </div>
  );
}

export default ForecastChart;