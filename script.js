var searchedCities = [];


$(document).submit(function () {
    event.preventDefault();
    //Open Weather API Call
    var cityName = $("#search").val();
    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=2f0ba5199de08099b1f937f7db0ea1d8";
    
    
    //var UVAPI = "https://api.openweathermap.org/data/2.5/uvi?appid=2f0ba5199de08099b1f937f7db0ea1d8&lat=" + lat + "&lon=" + lon
    //var lat = latitude
    //var lon = longitude

    $.ajax({
        url: openWeatherAPI,
        method: "GET"
    }).then(function (response) {
        // console.log the response 
        console.log(response)
        return response;
    });

});

$('.fa-search').on('click', function(){

    $('input[type="text"]').each(function(){    
        var value = $(this).val();
        searchedCities.push(value);
        for (var i = 0; i < searchedCities.length; i++) {
            localStorage.setItem(i, searchedCities[i]);
        }
       
    });
});

var cities = Object.values(localStorage);
console.log(cities)
