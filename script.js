const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getWeatherBtn').addEventListener('click', function () {
        const input = document.getElementById('cityInput').value.trim();
        if (!input) {
            alert('Пожалуйста, введите город или координаты.');
            return;
        }
        weatherFn(input);
    });
});

function weatherFn(input) {
    let temp;
    if (input.includes(',')) {
        const [lat, lon] = input.split(',').map(coord => coord.trim());
        temp = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
        temp = `${url}?q=${input}&appid=${apiKey}&units=metric`;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', temp, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            weatherShowFn(data);
        } else {
            alert('Город не найден. Пожалуйста, попробуйте снова.');
        }
    };
    xhr.onerror = function() {
        console.error('Ошибка при получении данных о погоде:', xhr.statusText);
    };
    xhr.send();
}

function weatherShowFn(data) {
    document.getElementById('weatherInfo').innerHTML = `
        <h2>${data.name}</h2>
        <p>Температура: ${data.main.temp}°C</p>
        <p>Описание: ${data.weather[0].description}</p>
        <p>Скорость ветра: ${data.wind.speed} м/с</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
    `;
}
