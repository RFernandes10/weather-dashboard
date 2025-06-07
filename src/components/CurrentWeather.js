import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';

function CurrentWeather({ weather, unit }) {
  if (!weather) return null;

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg mb-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Clima Atual em {weather.name}</h2>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FaTemperatureHigh className="text-[#64ffda]" />
            <p className="text-4xl font-bold">
              {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}
            </p>
          </div>
          <p className="text-gray-400 capitalize">{weather.weather[0].description}</p>
          <div className="flex items-center gap-2">
            <FaTint className="text-[#64ffda]" />
            <p>Umidade: {weather.main.humidity}%</p>
          </div>
          <div className="flex items-center gap-2">
            <FaWind className="text-[#64ffda]" />
            <p>Vento: {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Ícone do clima"
          className="w-16 h-16"
        />
      </div>
    </div>
  );
}

export default CurrentWeather;