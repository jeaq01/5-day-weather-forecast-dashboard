const apiKey = "ce51d65591c4599e275c32ee14b99e59";
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
let searchHistory = [];

window.addEventListener('load', function() {
    getHistoryRecord();
})

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
        //TODO save a record in the history
        saveHistoryRecord(city)
    } catch (error) {
        alert(error.message);        
    }
});

function getHistoryRecord(){
    searchHistory = JSON.parse(localStorage.getItem('searchHistory') ?? '[]');
    renderHistorySearch();
}

function saveHistoryRecord(cityName){
    //Save the record in the local storage
    searchHistory.push(cityName);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderHistorySearch();
}

function renderHistorySearch(){
    let historyContainer = document.getElementById('weatherHistory');
    historyContainer.innerHTML = '';
    searchHistory.forEach(function (search){
        let searchNode = document.createElement('div');
        searchNode.style.marginLeft = '10px';
        searchNode.style.marginRight = '10px';
        searchNode.style.height = '60px'
        searchNode.style.width = '100px'
        searchNode.style.backgroundColor = '#424141';
        searchNode.style.borderRadius = '10px';
        searchNode.style.display = 'flex';
        searchNode.style.flexDirection = 'row';
        searchNode.style.alignItems = 'center';
        searchNode.style.justifyContent = 'center';


        let searchNodeText = document.createElement('p');
        searchNodeText.style.color = 'white';
        searchNodeText.innerHTML = search;
        searchNode.appendChild(searchNodeText);
        historyContainer.appendChild(searchNode);
    });
}

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
        var icon;
        console.log(forecast.weather[0].main)
        switch (forecast.weather[0].main) {
            case 'Clouds':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>';
                break;
            case 'Rain':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96L96 320zm-6.8 52c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3l0 3c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-3c0-8.5 2.1-16.9 6.2-24.3L89.2 372zm160 0c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3l0 3c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-3c0-8.5 2.1-16.9 6.2-24.3L249.2 372zm124.9 64.6L409.2 372c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3l0 3c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-3c0-8.5 2.1-16.9 6.2-24.3z"/></svg>';
                break;
            case 'Clear':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>';
                break;
            default:
                icon = '<svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M493.7 .9L299.4 75.6l2.3-29.3c1-12.8-12.8-21.5-24-15.1L101.3 133.4C38.6 169.7 0 236.6 0 309C0 421.1 90.9 512 203 512c72.4 0 139.4-38.6 175.7-101.3L480.8 234.3c6.5-11.1-2.2-25-15.1-24l-29.3 2.3L511.1 18.3c.6-1.5 .9-3.2 .9-4.8C512 6 506 0 498.5 0c-1.7 0-3.3 .3-4.8 .9zM192 192a128 128 0 1 1 0 256 128 128 0 1 1 0-256zm0 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm16 96a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>';
                break;
        }
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <h3>${day}</h3>
            ${icon}
            <p>Temp: ${temp} °C</p>
            <p>Wind: ${wind} MPH </p>
            <p>humidity: ${humidity}%</p>
            <p>${weatherDescription}</p>            
        `;

        weatherDisplay.appendChild(card);
    });
}