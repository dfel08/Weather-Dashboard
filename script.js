var searchedCities = [];


$(document).submit(function () {
    event.preventDefault();
    //Open Weather API Call
    var cityName = $("#search").val();
    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=2f0ba5199de08099b1f937f7db0ea1d8";
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=2f0ba5199de08099b1f937f7db0ea1d8";
    
    $.ajax({
        url: fiveDay,
        method: "GET"
    }).then(function (intialResponse) {
        console.log(intialResponse)
    })
    

    $.ajax({
        url: openWeatherAPI,
        method: "GET"
    }).then(function (response) {
        // console.log the response 
        console.log(response)
        $("#city-name").text(response.name);
        $("#temp").text("Temperature: " + response.main.temp + " Kelvin");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph");
        
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var UVAPI = "https://api.openweathermap.org/data/2.5/uvi?appid=2f0ba5199de08099b1f937f7db0ea1d8&lat=" + lat + "&lon=" + lon;
    
        $.ajax({
            url: UVAPI,
            method: "GET"
        }).then(function (res) {
            console.log(res)
            $("#uv-index").text("UV Index: " + res.value);
        })
    });


});

$('.fa-search').on('click', function(){

    $('input[type="text"]').each(function(){    
        var value = $(this).val();
        
        searchedCities.push(value);
        $("#searched-cities").empty();
        for (var i = 0; i < searchedCities.length; i++) {
            localStorage.setItem(i, searchedCities[i]);
            var button = $("<button>").text(searchedCities[i]);
            var li = $("<li>").append(button);
            $("#searched-cities").append(li);
            console.log(searchedCities)
        }

    });
    
});

function renderSearch() {
    var cities = Object.values(localStorage);
    $("#searched-cities").empty();
        for (var i = 0; i < cities.length; i++) {
            var button = $("<button>").text(cities[i]);
            var li = $("<li>").append(button);
            $("#searched-cities").append(li);
        }
}

renderSearch();




