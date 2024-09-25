const apiKey = "ce51d65591c4599e275c32ee14b99e59";
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');

getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }
  
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod !== '200') {
            throw new Error(data.message);
        }

        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
});

function displayWeather(data) {
    weatherDisplay.innerHTML = '';

    const forecasts = data.list.filter((item, index) => index % 8 === 0); // Get one forecast per day (every 8 hours)

    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description;

        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <h3>${day}</h3>
            <p>${temp} °C</p>
            <p>${weatherDescription}</p>
        `;

        weatherDisplay.appendChild(card);
    });
}