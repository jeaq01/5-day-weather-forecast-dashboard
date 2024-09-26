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
        console.log(response);
        const data = await response.json();
         console.log(data);
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
        console.log(date);
        const day = date.toLocaleDateString('en-US', { dateStyle: 'full' });
        const temp = forecast.main.temp;
        const humidity= forecast.main.humidity;
        const wind= forecast.wind.speed;
        const weatherDescription = forecast.weather[0].description;

        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <h3>${day}</h3>
            <p>Temp: ${temp} °C</p>
            <p>Wind: ${wind} MPH </p>
            <p>humidity: ${humidity}%</p>
            <p>${weatherDescription}</p>

        `;

        weatherDisplay.appendChild(card);
    });
}