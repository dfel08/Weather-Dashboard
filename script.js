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
    }).then(function (initialResponse) {
        console.log(initialResponse);
        $("#dayOneDate").append(initialResponse.list[0].dt_txt);
        $("#dayOneTemp").append("Temperature: " + initialResponse.list[0].main.temp + " Kelvin");
        $("#dayOneClouds").append("Weather: " + initialResponse.list[0].weather[0].description);
        $("#dayOneHumidity").append("Humidity: " + initialResponse.list[0].main.humidity + "%");
        $("#dayTwoDate").append(initialResponse.list[8].dt_txt);
        $("#dayTwoTemp").append("Temperature: " + initialResponse.list[8].main.temp + " Kelvin");
        $("#dayTwoClouds").append("Weather: " + initialResponse.list[8].weather[0].description);
        $("#dayTwoHumidity").append("Humidity: " + initialResponse.list[8].main.humidity + "%");
        $("#dayThreeDate").append(initialResponse.list[16].dt_txt);
        $("#dayThreeTemp").append("Temperature: " + initialResponse.list[16].main.temp + " Kelvin");
        $("#dayThreeClouds").append("Weather: " + initialResponse.list[16].weather[0].description);
        $("#dayThreeHumidity").append("Humidity: " + initialResponse.list[16].main.humidity + "%");
        $("#dayFourDate").append(initialResponse.list[24].dt_txt);
        $("#dayFourTemp").append("Temperature: " + initialResponse.list[24].main.temp + " Kelvin");
        $("#dayFourClouds").append("Weather: " + initialResponse.list[24].weather[0].description);
        $("#dayFourHumidity").append("Humidity: " + initialResponse.list[24].main.humidity + "%");
        $("#dayFiveDate").append(initialResponse.list[32].dt_txt);
        $("#dayFiveTemp").append("Temperature: " + initialResponse.list[32].main.temp + " Kelvin");
        $("#dayFiveClouds").append("Weather: " + initialResponse.list[32].weather[0].description);
        $("#dayFiveHumidity").append("Humidity: " + initialResponse.list[32].main.humidity + "%");
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
            if (res.value = 0 && res.value < 2) {
                $("#uv-index").css("background-color", "green");
            } else if (res.value > 2 && res.value < 5) {
                $("#uv-index").css("background-color", "yellow");
            } else (res.value > 5); {
                $("#uv-index").css("background-color", "red");
            };
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




