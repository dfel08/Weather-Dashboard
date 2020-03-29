console.log("Hello")

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