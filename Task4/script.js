const apiKey = 'api-key';
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const cityInput = document.getElementById('cityInput');

async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        // console.log(response)
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        console.log(data)
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');

    temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;

    errorMessage.classList.remove('active');
    weatherInfo.classList.add('active');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
    weatherInfo.classList.remove('active');
}

cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
