console.log("Hello")
//UV API Call
var unirest = require("unirest");

var req = unirest("GET", "https://weatheronline2-uv-index-v1.p.rapidapi.com/api/countrycitylist");

req.headers({
	"x-rapidapi-host": "weatheronline2-uv-index-v1.p.rapidapi.com",
	"x-rapidapi-key": "e00431f19fmshdb1dcf01d2cc529p1acb6djsnb2fd2c425430"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
//Open Weather API Call
var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=2f0ba5199de08099b1f937f7db0ea1d8"
var cityName = 

