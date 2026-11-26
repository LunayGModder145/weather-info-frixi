import { useState, useEffect } from 'react'
import WeatherList from './components/WeatherList';
import './App.css'

function App() {
  const [city, setCity] = useState('Madrid');
  const [inputCity, setInputCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=metric&lang=es&appid=${apiKey}`;                                                                              

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('No se encontró la ciudad o hubo un problema con la API');
        }

        const data = await response.json();
        setForecast(data.list);
      } catch (err) {
        setError(err.message);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputCity.trim();
    if (!trimmed) return;
    setCity(trimmed);
    setInputCity('');
  };

  return (
    <main className="app-container">
      <header>
        <h1>Weather Info</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Busca una ciudad (ej. Sevilla, Tokyo)..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <h2>Pronóstico para {city}</h2>

      {loading && <p>Cargando pronóstico...</p>}
      {error && <p className="error-msg">{error}</p>}
      {!loading && !error && <WeatherList forecast={forecast} />}
    </main>
  );
}

export default App;