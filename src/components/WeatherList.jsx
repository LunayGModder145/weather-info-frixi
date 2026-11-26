import { v4 as uuidv4 } from 'uuid';
import WeatherCard from './WeatherCard';

const WeatherList = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <section className="weather-list">
      {forecast.map((item) => (
        <WeatherCard key={uuidv4()} item={item} />
      ))}
    </section>
  );
};

export default WeatherList;