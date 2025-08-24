// Simple manual city → lat/lon map
const cityCoords = {
  "bangalore": { lat: 12.9716, lon: 77.5946 },
  "delhi": { lat: 28.6139, lon: 77.2090 },
  "mumbai": { lat: 19.0760, lon: 72.8777 },
  "new york": { lat: 40.7128, lon: -74.0060 },
  "london": { lat: 51.5072, lon: -0.1276 }
};

async function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim().toLowerCase();
  const resultBox = document.getElementById("weatherResult");

  if (!cityCoords[cityInput]) {
    resultBox.innerHTML = `<p style="color:red;">City not supported. Try Bangalore, Delhi, London, etc.</p>`;
    return;
  }

  const { lat, lon } = cityCoords[cityInput];

  const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${lat}&lon=${lon}&units=metric`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "ai-weather-by-meteosource.p.rapidapi.com",
        "x-rapidapi-key": "83d128c464msh3ded93c51f3f206p1875c4jsn31a3a9f7c4e9"
      }
    });

    if (!response.ok) throw new Error("API error or city not supported");

    const data = await response.json();
    const current = data.current;

    resultBox.innerHTML = `
      <p><strong>City:</strong> ${cityInput.charAt(0).toUpperCase() + cityInput.slice(1)}</p>
      <p><strong>Temperature:</strong> ${current.temperature}°C</p>
      <p><strong>Feels Like:</strong> ${current.feels_like}°C</p>
      <p><strong>Condition:</strong> ${current.summary}</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}
