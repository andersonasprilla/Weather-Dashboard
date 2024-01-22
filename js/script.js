const APIKey = '9ecd32ab11a8da67215f420ae16fd52d';
var cityName = 'Atlanta';
const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;

$(document).ready(function () {

    function getAPI () {
        fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data){
            console.log(data)
            $('#temp').text('Temperature:' + data.main.temp + 'F°') 
        })
    }

       



$('#atlantaBtn').on('click', getAPI)
});

