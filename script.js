var searchedCities = [];
var cities = Object.values(localStorage);


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
        //$("#forecast-display").empty();
        var dayOneDate = initialResponse.list[0].dt_txt
        var dayOne = dayOneDate.substring(0, dayOneDate.length - 8)
        var dayTwoDate = initialResponse.list[8].dt_txt
        var dayTwo = dayTwoDate.substring(0, dayTwoDate.length - 8)
        var dayThreeDate = initialResponse.list[16].dt_txt
        var dayThree = dayThreeDate.substring(0, dayThreeDate.length - 8)
        var dayFourDate = initialResponse.list[24].dt_txt
        var dayFour = dayFourDate.substring(0, dayFourDate.length - 8)
        var dayFiveDate = initialResponse.list[32].dt_txt
        var dayFive = dayFiveDate.substring(0, dayFiveDate.length - 8)
        $("#dayOneDate").text(dayOne);
        $("#dayOneTemp").text("Temperature: " + initialResponse.list[0].main.temp + " Kelvin");
        $("#dayOneClouds").text("Weather: " + initialResponse.list[0].weather[0].description);
        $("#dayOneHumidity").text("Humidity: " + initialResponse.list[0].main.humidity + "%");
        $("#dayTwoDate").text(dayTwo);
        $("#dayTwoTemp").text("Temperature: " + initialResponse.list[8].main.temp + " Kelvin");
        $("#dayTwoClouds").text("Weather: " + initialResponse.list[8].weather[0].description);
        $("#dayTwoHumidity").text("Humidity: " + initialResponse.list[8].main.humidity + "%");
        $("#dayThreeDate").text(dayThree);
        $("#dayThreeTemp").text("Temperature: " + initialResponse.list[16].main.temp + " Kelvin");
        $("#dayThreeClouds").text("Weather: " + initialResponse.list[16].weather[0].description);
        $("#dayThreeHumidity").text("Humidity: " + initialResponse.list[16].main.humidity + "%");
        $("#dayFourDate").text(dayFour);
        $("#dayFourTemp").text("Temperature: " + initialResponse.list[24].main.temp + " Kelvin");
        $("#dayFourClouds").text("Weather: " + initialResponse.list[24].weather[0].description);
        $("#dayFourHumidity").text("Humidity: " + initialResponse.list[24].main.humidity + "%");
        $("#dayFiveDate").text(dayFive);
        $("#dayFiveTemp").text("Temperature: " + initialResponse.list[32].main.temp + " Kelvin");
        $("#dayFiveClouds").text("Weather: " + initialResponse.list[32].weather[0].description);
        $("#dayFiveHumidity").text("Humidity: " + initialResponse.list[32].main.humidity + "%");
    })
    

    $.ajax({
        url: openWeatherAPI,
        method: "GET"
    }).then(function (response) {
        // console.log the response 
        console.log(response)
        var icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon;

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
    $("#searched-cities").empty();
        for (var i = 0; i < cities.length; i++) {
            var button = $("<button class='cities'>").text(cities[i]);
            var li = $("<li>").append(button);
            $("#searched-cities").append(li);
        }
}

$(document).on('click', ".cities", function() {
    console.log("I was clicked")
})

renderSearch();




