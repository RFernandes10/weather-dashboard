import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import CurrentWeather from "./components/CurrentWeather";
import ForecastChart from "./components/ForecastChart";
import WeatherAlerts from "./components/WeatherAlerts";
import UnitToggle from "./components/UnitToggle";
import "./App.css";

const API_KEY = "30f35abd4ba3e777c8c41f105f384682";
const DEFAULT_CITY = "Rio de Janeiro";

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [searchCity, setSearchCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [unit, setUnit] = useState("metric"); // 'metric' para Celsius, 'imperial' para Fahrenheit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para remover acentos e formatar cidade
  const normalizeCity = (cityName) => {
    return (
      cityName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase() + ",BR"
    ); // Mantém espaços e adiciona código do país
  };

  const fetchWeatherData = async (cityName, useGeolocation = false) => {
    setLoading(true);
    setError(null);

    try {
      let lat, lon, normalizedCity;
      if (useGeolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      } else if (cityName) {
        normalizedCity = normalizeCity(cityName);
      }

      const weatherUrl = useGeolocation
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${normalizedCity}&appid=${API_KEY}&units=${unit}`;
      const forecastUrl = useGeolocation
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
        : `https://api.openweathermap.org/data/2.5/forecast?q=${normalizedCity}&appid=${API_KEY}&units=${unit}`;

      // Fetch clima atual
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        const errorData = await weatherRes.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro HTTP: ${weatherRes.status}`);
      }
      const weatherData = await weatherRes.json();
      if (weatherData.cod && Number(weatherData.cod) !== 200) {
        throw new Error(
          weatherData.message || `Erro na API: ${weatherData.cod}`
        );
      }
      setCurrentWeather(weatherData);

      // Simulando alertas
      const newAlerts = [];
      if (weatherData.main.temp > (unit === "metric" ? 30 : 86)) {
        newAlerts.push(
          `Temperatura alta: ${weatherData.main.temp}°${
            unit === "metric" ? "C" : "F"
          }`
        );
      }
      if (weatherData.weather[0].main === "Rain") {
        newAlerts.push("Chuva detectada!");
      }
      if (newAlerts.length) {
        setAlerts(newAlerts);
        newAlerts.forEach((alert) => toast.error(alert));
      } else {
        setAlerts([]);
      }

      // Fetch previsão
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) {
        const errorData = await forecastRes.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Erro HTTP: ${forecastRes.status}`
        );
      }
      const forecastData = await forecastRes.json();
      if (forecastData.cod && Number(forecastData.cod) !== 200) {
        throw new Error(
          forecastData.message || `Erro na API: ${forecastData.cod}`
        );
      }
      const dailyForecast = forecastData.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast);

      if (useGeolocation) {
        setCity(weatherData.name);
      }
    } catch (err) {
      console.error("Erro ao buscar dados:", {
        message: err.message,
        stack: err.stack,
        status: err.status,
      });
      const errorMessage =
        err.message || "Falha ao buscar dados do clima. Tente novamente.";
      setError(errorMessage);
      toast.error(`Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
    const interval = setInterval(() => fetchWeatherData(city), 600000); // Atualiza a cada 10 minutos
    return () => clearInterval(interval);
  }, [city, unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
      setSearchCity("");
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      fetchWeatherData(null, true);
    } else {
      toast.error("Geolocalização não suportada pelo seu navegador.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('/fundo.jpg')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <Toaster position="top-center" />
      <div className="relative p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#4ecdc4] animate-fade-in">
          Dashboard de Clima
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 animate-fade-in">
            <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Buscar cidade..."
                className="flex-1 p-3 rounded-l-lg bg-gray-700 border border-[#64ffda] text-white focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
              />
              <button
                type="submit"
                className="bg-[#64ffda] text-black font-semibold py-3 px-4 rounded-r-lg hover:bg-[#4ecdc4] transition-all"
              >
                Buscar
              </button>
            </form>
            <div className="flex gap-2">
              <button
                onClick={handleGeolocation}
                className="bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-all"
              >
                Usar minha localização
              </button>
              <UnitToggle unit={unit} setUnit={setUnit} />
            </div>
          </div>
          {loading && (
            <div className="text-center text-white mb-6 animate-pulse">
              Carregando...
            </div>
          )}
          {error && (
            <div className="text-center text-red-400 mb-6 animate-fade-in">
              {error}
            </div>
          )}
          <CurrentWeather weather={currentWeather} unit={unit} />
          <WeatherAlerts alerts={alerts} />
          <ForecastChart forecast={forecast} unit={unit} />
        </div>
      </div>
    </div>
  );
}

export default App;
