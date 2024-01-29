const APIKey = '9ecd32ab11a8da67215f420ae16fd52d';

$(document).ready(function () {

    // UI Elements
    var forecastHeading = $('<h4>').addClass('mt-5 mx-2').text('5-Day Forecast');
    var hrLine = $('<hr>').addClass('mx-2');
    var currentWeatherCard;

    // Function to create a card structure
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

    // Function to display the current weather card
    function displayCurrentWeatherCard(data) {
        // Check if the card already exists
        if (!currentWeatherCard) {
            // If it doesn't exist, create a new card
            currentWeatherCard = createCard();
            $('.current-weather-section').append(currentWeatherCard);
        }

        // Populate card with current weather data
        $('.card-header', currentWeatherCard).text(data.name + dayjs().format(' MM/DD/YYYY'));
        $('.weather-icon', currentWeatherCard).attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        $('.temp', currentWeatherCard).text('Temp: ' + data.main.temp + ' F°');
        $('.wind', currentWeatherCard).text('Wind: ' + data.wind.speed + ' MPH');
        $('.humidity', currentWeatherCard).text('Humidity: ' + data.main.humidity + '%');
        $('.current-weather-section').append(currentWeatherCard);
    }

    // Function to display the five-day forecast cards
    function displayFiveDayForecastCard(data) {
        const indices = [2, 8, 16, 24, 32];

        // Append forecast heading and line
        $('.five-day-forecast-title').append(forecastHeading)
        $('.five-day-forecast-title').append(hrLine)

        // Clear existing content of forecast cards
        $('.forecast-card-1, .forecast-card-2, .forecast-card-3, .forecast-card-4, .forecast-card-5').empty();

        // Loop through forecast data and create cards
        for (var i = 0; i < indices.length; i++) {
            var forecastCard = createCard(); // create a new forecast card instance
            const index = indices[i];

            // Populate forecast card with data
            $('.card-header', forecastCard).text(dayjs(data.list[index].dt_txt).format('MM/DD/YYYY'));
            $('.weather-icon', forecastCard).attr('src', `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`)
            $('.temp', forecastCard).text('Temp: ' + data.list[index].main.temp + ' F°');
            $('.wind', forecastCard).text('Wind: ' + data.list[index].wind.speed + ' MPH');
            $('.humidity', forecastCard).text('Humidity: ' + data.list[index].main.humidity + '%');

            // Append the forecast card to the corresponding element
            $('.forecast-card-' + (i + 1)).append(forecastCard);
        }
    }

    // Function to make API requests and update UI
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
                // Fetch five-day forecast data
                return fetch(requestFiveDayForecastUrl)
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (fiveDayForecastData) {
                displayFiveDayForecastCard(fiveDayForecastData)
            })
            .catch(function (error) {
                console.error('API request error', error)
            })
    }

    // Function to load buttons from local storage
    function loadButtonsFromLocalStorage() {
        var storedCities = JSON.parse(localStorage.getItem('searchItems')) || [];

        storedCities.forEach(function (city) {
            createButton(city);
        });
    }

    // Call the function to load buttons when the page is ready
    loadButtonsFromLocalStorage();


    // Form submission handler
    var formEL = $('#searchForm');
    var inputEl = $('#searchInput');

    function searchHandler(event) {
        event.preventDefault();
        var inputCity = inputEl.val();
        if (!inputCity) {
            return
        } else {
            // Store the array in local storage after converting it to a JSON string
            var storedCities = JSON.parse(localStorage.getItem('searchItems')) || [];
            storedCities.push(inputCity);
            localStorage.setItem('searchItems', JSON.stringify(storedCities));

            // Clear the input field
            inputEl.val('');

            // Make API request and create a button
            getAPI(inputCity);
            createButton(inputCity);
        }
    }

    // Attach form submission handler
    formEL.on('submit', searchHandler);

    // Click event for city buttons
    $('.city-buttons').on('click', 'button', function () {
        var city = $(this).text();
        getAPI(city);
    });
});

// Function to create a button and append it to the list of buttons
function createButton(city) {
    var listButtons = $('.city-buttons');
    var button = $('<button>').addClass('btn btn-secondary mb-2').text(city);
    listButtons.append(button);
}
