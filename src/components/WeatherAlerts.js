function WeatherAlerts({ alerts }) {
  if (!alerts.length) return null;

  return (
    <div className="p-4 bg-red-600 rounded-lg shadow-lg mb-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-2">Alertas Meteorológicos</h3>
      <ul className="list-disc list-inside">
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherAlerts;