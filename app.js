const express = require("express");

const https = require("https");

const  bodyParser =  require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   
   res.sendFile(__dirname + "/index.html") ;

})

app.post("/", function(req,res) {

const query = req.body.cityName
const appKey = "d4bd62cfa37b667cd027dca021345ba2"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&mode=Json&appid="+ appKey + "&lang=en";

https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data" , function(data) {
        console.log(JSON.parse(data));
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon    
        const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>Welcome to the Weather Forecasting</h1>");
        res.write("<h1>the Temp in " + query +" is "+ temp + " celsius</h1>");
        res.write("<h1>The weather is " + weatherDescription +"</h1>");
        res.write("<img src =" + imgURL + ">");
        res.send();
    })
})



});



app.listen(3000, function(){
    console.log("server is working on port 3000");
});




