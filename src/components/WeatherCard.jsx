const WeatherCard = ({ item }) => {
  const { dt_txt, main, weather } = item;
  const condition = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

  return (
    <article className="weather-card">
      <p className="weather-time">{dt_txt}</p>
      <img src={iconUrl} alt={condition.description} />
      <h3>{Math.round(main.temp)}°C</h3>
      <p className="weather-desc">{condition.main} ({condition.description})</p>
    </article>
  );
};

export default WeatherCard;