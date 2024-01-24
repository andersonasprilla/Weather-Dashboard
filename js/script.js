const APIKey = '9ecd32ab11a8da67215f420ae16fd52d';

$(document).ready(function () {

    var forecastHeading = $('<h4>').addClass('mt-5 mx-2').text('5-Day Forecast');
    var hrLine = $('<hr>').addClass('mx-2');

    function createCard() {
        var card = $('<div>').addClass('card mx-2');
        var h5 = $('<h5>').addClass('card-header');
        card.append(h5);
        var cardBody = $('<div>').addClass('card-body');
        card.append(cardBody);
        var ulList = $('<ul>').addClass('list-group list-group-flush');
        var weatherIcon = $('<img>').addClass('weather-icon mx-auto')
        var olTemp = $('<ol>').addClass('list-group-item temp');
        var olWind = $('<ol>').addClass('list-group-item wind');
        var olHumidity = $('<ol>').addClass('list-group-item humidity');
        ulList.append(weatherIcon)
        ulList.append(olTemp);
        ulList.append(olWind);
        ulList.append(olHumidity);
        cardBody.append(ulList);

        return card;
    }
    
    var currentWeatherCard;

    function displayCurrentWeatherCard(data) {
        // Check if the card already exists
        if (!currentWeatherCard) {
            // If it doesn't exist, create a new card
            currentWeatherCard = createCard();
            $('.current-weather-section').append(currentWeatherCard);
        }
        
        $('.weather-icon', currentWeatherCard).attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        $('.card-header', currentWeatherCard).text(data.name + dayjs().format(' MM/DD/YYYY'));
        $('.temp', currentWeatherCard).text('Temperature: ' + data.main.temp + ' F°');
        $('.wind', currentWeatherCard).text('Wind: ' + data.wind.speed + ' MPH');
        $('.humidity', currentWeatherCard).text('Humidity: ' + data.main.humidity + '%');
        $('.current-weather-section').append(currentWeatherCard);
    }

    function displayFiveDayForecastCard(data) {
        const indices = [2, 8, 16, 24, 32];

        $('.five-day-forecast-title').append(forecastHeading)
        $('.five-day-forecast-title').append(hrLine)

        // Clear existing content of forecast cards
        $('.forecast-card-1, .forecast-card-2, .forecast-card-3, .forecast-card-4, .forecast-card-5').empty();

        for (var i = 0; i < indices.length; i++) {
            var forecastCard = createCard(); // create a new forecast card instance
            const index = indices[i];

            $('.card-header', forecastCard).text(dayjs(data.list[index].dt_txt).format('MM/DD/YYYY'));
            $('.weather-icon', forecastCard).attr('src', `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`)
            $('.temp', forecastCard).text('Temperature: ' + data.list[index].main.temp + ' F°');
            $('.wind', forecastCard).text('Wind: ' + data.list[index].wind.speed + ' MPH');
            $('.humidity', forecastCard).text('Humidity: ' + data.list[index].main.humidity + '%');

            // append the forecast card to the corresponding element
            $('.forecast-card-' + (i + 1)).append(forecastCard);
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
                displayCurrentWeatherCard(currentWeatherData)
                //Fetch five-day forecast data
                return fetch(requestFiveDayForecastUrl)
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (fiveDayForecastData) {
                displayFiveDayForecastCard(fiveDayForecastData)
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

