const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
    const query = req.body.cityName;
    const keyid = "988a575763693e3288045d51053a0190";
    const unit = "metric"
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+keyid+"&units="+unit;

    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp= weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const icon= weatherData.weather[0].icon
        const imgURL ="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        //res.send("<h1>The Temperature of Bhopal is "+temp+" degree celcius.<br> The weather is currently: "+weatherDescription+"</h1>")
        res.write("<h1>The Temperature of "+query+" is "+temp+" degree celcius</h1>")
        res.write("<p>The weather is currently: "+weatherDescription+"</p>")
        res.write("<img src="+imgURL+">")
        res.send()
    })
})
})




app.listen(3000, function(){
    console.log("Server is working on localhost 3000.");
})