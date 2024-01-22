const APIKey = '9ecd32ab11a8da67215f420ae16fd52d';

$(document).ready(function () {

    function displayCurrentWeatherCard () {
        $('#card').addClass('card mx-2')
        $('#current-weather-header').addClass('card-header')
        $('#card-body').addClass('card-body')
        $('#ul-list').addClass('list-group list-group-flush')
        $('#temp').addClass("list-group-item")
        $('#wind').addClass("list-group-item")
        $('#humidity').addClass("list-group-item")
    }

    function displayFiveDayForecastCard() {
        $('#five-day-forecast-card').addClass('card mx-2');
        $('#five-day-forecast-header').addClass('card-header');
        $('#five-day-card-body').addClass('card-body');
        $('#ul-list-five-day').addClass('list-group list-group-flush');
        $('#five-day-forecast-temp').addClass("list-group-item");
        $('#five-day-forecast-wind').addClass("list-group-item");
        $('#five-day-forecast-humidity').addClass("list-group-item");

        $('#five-day-forecast-card1').addClass('card mx-2');
        $('#five-day-forecast-header1').addClass('card-header');
        $('#five-day-card-body1').addClass('card-body');
        $('#ul-list-five-day1').addClass('list-group list-group-flush');
        $('#five-day-forecast-temp1').addClass("list-group-item");
        $('#five-day-forecast-wind1').addClass("list-group-item");
        $('#five-day-forecast-humidity1').addClass("list-group-item");

        $('#five-day-forecast-card2').addClass('card mx-2');
        $('#five-day-forecast-header2').addClass('card-header');
        $('#five-day-card-body2').addClass('card-body');
        $('#ul-list-five-day2').addClass('list-group list-group-flush');
        $('#five-day-forecast-temp2').addClass("list-group-item");
        $('#five-day-forecast-wind2').addClass("list-group-item");
        $('#five-day-forecast-humidity2').addClass("list-group-item");

        $('#five-day-forecast-card3').addClass('card mx-2');
        $('#five-day-forecast-header3').addClass('card-header');
        $('#five-day-card-body3').addClass('card-body');
        $('#ul-list-five-day3').addClass('list-group list-group-flush');
        $('#five-day-forecast-temp3').addClass("list-group-item");
        $('#five-day-forecast-wind3').addClass("list-group-item");
        $('#five-day-forecast-humidity3').addClass("list-group-item");
        
        $('#five-day-forecast-card4').addClass('card mx-2');
        $('#five-day-forecast-header4').addClass('card-header');
        $('#five-day-card-body4').addClass('card-body');
        $('#ul-list-five-day4').addClass('list-group list-group-flush');
        $('#five-day-forecast-temp4').addClass("list-group-item");
        $('#five-day-forecast-wind4').addClass("list-group-item");
        $('#five-day-forecast-humidity4').addClass("list-group-item");
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

                displayFiveDayForecastCard()
                console.log(fiveDayForecastData)
                $('#five-day-forecast-header').text(dayjs(fiveDayForecastData.list[2].dt_txt).format('MM/DD/YYYY'))
                $('#five-day-forecast-temp').text('Temperature: '+ fiveDayForecastData.list[2].main.temp + ' F°')
                $('#five-day-forecast-wind').text('Wind: ' + fiveDayForecastData.list[2].wind.speed + ' MPH')
                $('#five-day-forecast-humidity').text('Humidity: ' + fiveDayForecastData.list[2].main.humidity + '%')

                $('#five-day-forecast-header1').text(dayjs(fiveDayForecastData.list[10].dt_txt).format('MM/DD/YYYY'))
                $('#five-day-forecast-temp1').text('Temperature: '+ fiveDayForecastData.list[10].main.temp + ' F°')
                $('#five-day-forecast-wind1').text('Wind: ' + fiveDayForecastData.list[10].wind.speed + ' MPH')
                $('#five-day-forecast-humidity1').text('Humidity: ' + fiveDayForecastData.list[10].main.humidity + '%')

                $('#five-day-forecast-header2').text(dayjs(fiveDayForecastData.list[18].dt_txt).format('MM/DD/YYYY'))
                $('#five-day-forecast-temp2').text('Temperature: '+ fiveDayForecastData.list[18].main.temp + ' F°')
                $('#five-day-forecast-wind2').text('Wind: ' + fiveDayForecastData.list[18].wind.speed + ' MPH')
                $('#five-day-forecast-humidity2').text('Humidity: ' + fiveDayForecastData.list[18].main.humidity + '%')

                $('#five-day-forecast-header3').text(dayjs(fiveDayForecastData.list[26].dt_txt).format('MM/DD/YYYY'))
                $('#five-day-forecast-temp3').text('Temperature: '+ fiveDayForecastData.list[26].main.temp + ' F°')
                $('#five-day-forecast-wind3').text('Wind: ' + fiveDayForecastData.list[26].wind.speed + ' MPH')
                $('#five-day-forecast-humidity3').text('Humidity: ' + fiveDayForecastData.list[26].main.humidity + '%')

                $('#five-day-forecast-header4').text(dayjs(fiveDayForecastData.list[34].dt_txt).format('MM/DD/YYYY'))
                $('#five-day-forecast-temp4').text('Temperature: '+ fiveDayForecastData.list[34].main.temp + ' F°')
                $('#five-day-forecast-wind4').text('Wind: ' + fiveDayForecastData.list[34].wind.speed + ' MPH')
                $('#five-day-forecast-humidity4').text('Humidity: ' + fiveDayForecastData.list[34].main.humidity + '%')

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

