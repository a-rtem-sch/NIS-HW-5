// var url = 'https://api.openweathermap.org/data/2.5/weather';
// var apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value != ''){
        searchWeather();
    }
});

const searchWeather = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url + '&q=' + valueSearch.value, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            if(data.cod == 200){
                city.querySelector('h2').innerHTML = data.name;
                // city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        } else {
            console.error("Ошибка при выполнении запроса: " + xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error("Ошибка при выполнении запроса.");
    };
    xhr.send();
}

// search Default
const initApp = () => {
    valueSearch.value = 'Washington';
    searchWeather();
}
initApp();