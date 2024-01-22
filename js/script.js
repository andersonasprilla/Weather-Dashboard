const APIKey = '9ecd32ab11a8da67215f420ae16fd52d';

$(document).ready(function () {

    function displayCurrentWeatherCard () {
        $('#card').addClass('card mx-2')
        $('#current-weather-header').addClass('card-header')
        $('#card-body').addClass('card-body')
        $('#ul-list').addClass('list-group list-group-flush')
        $('temp').addClass("list-group-item")
        $('wind').addClass("list-group-item")
        $('humidity').addClass("list-group-item")
    }

    function displayFiveDayForecastCard() {
        for(var i = 0; i < 5; i++){
            displayCurrentWeatherCard()
        }
    }

    function getAPI(city) {
        const requestCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
        const requestFiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`

        // Fetch current weather data
        fetch(requestCurrentWeatherUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (currentWeatherData) {
                displayCurrentWeatherCard()
                $('#current-weather-header').text(currentWeatherData.name + dayjs().format(' MM/DD/YYYY'))
                $('#temp').text('Temperature: ' + currentWeatherData.main.temp + ' F°')
                $('#wind').text('Wind: ' + currentWeatherData.wind.speed + ' MPH')
                $('#humidity').text('Humidity: ' + currentWeatherData.main.humidity + '%')

                //Fetch five-day forecast data
                return fetch(requestFiveDayForecastUrl)
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (fiveDayForecastData) {
                console.log(fiveDayForecastData)
                $('#five-day-forecast-header').text(dayjs(fiveDayForecastData.list[2].dt_txt).format('MM/DD/YYYY'))
                $('#five-day-forecast-temp').text('Temperature: '+ fiveDayForecastData.list[2].main.temp + ' F°')
                $('#five-day-forecast-wind').text('Wind: ' + fiveDayForecastData.list[2].wind.speed + ' MPH')
                $('#five-day-forecast-humidity').text('Humidity: ' + fiveDayForecastData.list[2].main.humidity + '%')
            })
    }

    //Call API when clicking button
    $('#atlantaBtn').on('click', function () {
        getAPI('Atlanta');
    })
    $('#denverBtn').on('click', function () {
        getAPI('Denver');
    })
    $('#seattleBtn').on('click', function () {
        getAPI('Seattle');
    })
    $('#sanFranciscoBtn').on('click', function () {
        getAPI('San Francisco');
    })
    $('#orlandoBtn').on('click', function () {
        getAPI('Orlando');
    })
    $('#newYorkBtn').on('click', function () {
        getAPI('New York');
    })
    $('#chicagoBtn').on('click', function () {
        getAPI('Chicago');
    })
    $('#austinBtn').on('click', function () {
        getAPI('Austin');
    })
});

