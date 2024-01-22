const APIKey = '9ecd32ab11a8da67215f420ae16fd52d';

$(document).ready(function () {

    function displayCard () {
        $('#card').addClass('card mx-2')
        $('#cityName').addClass('card-header')
        $('#card-body').addClass('card-body')
        $('#ul-list').addClass('list-group list-group-flush')
        $('temp').addClass("list-group-item")
        $('wind').addClass("list-group-item")
        $('humidity').addClass("list-group-item")
    }

    function getAPI(city) {
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;

        fetch(requestUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                displayCard()
                $('#cityName').text(data.name + dayjs().format(' MM/DD/YYYY'))
                $('#temp').text('Temperature: ' + data.main.temp + ' F°')
                $('#wind').text('Wind: ' + data.wind.speed + ' MPH')
                $('#humidity').text('Humidity: ' + data.main.humidity + '%')
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

