const express = require("express");
const app = express(); //npn module
const https = require("https"); // this is also an npm module
const bodyParser = require("body-parser");//body parser is a npm moduel that help us to fetch the data from the body of an page

app.use(bodyParser.urlencoded({
  extended: true
}))

//this will listern for the port 3000
app.listen(3000, function() {
  console.log("server is running on port 3000");
})

//this is the get request to our server
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//this is all the back end that wil happen in the server in order to fetch the data from the API and send it back to our webite.
app.post("/", function(req, res) {
  const city =req.body.cityName;
  const unit = "metric";
  const appid = "";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&units="+unit+"&appid="+appid;
  //here is an use of a https npm module
  https.get(url,function(response){
    console.log(response.statusCode);

    //the process of fetching the data from the API.
    response.on("data",function(data){
      const wetherdata = JSON.parse(data);//jason.parse is used to fetch the actual readiable data from the API
      const discription = wetherdata.weather[0].description;//here the path of the perticular data is gained using json viewer pro (crome extention)
      const temp = wetherdata.main.temp;
      const icon =wetherdata.weather[0].icon;
      const feelsLike= wetherdata.main.feels_like;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write(`<!DOCTYPE html> <html lang="en">
      <head> <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Weather Station</title> <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" /> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
      <link rel="stylesheet" href="./css/style.css" /> </head>
      <body>
      <h1>temperature of the ${city} today is ${temp} degree celcius</h1>
      <img src=${imgUrl}>
      <h3>it feels like ${feelsLike} degree celcius</h3>
      <h3>the wether is currently ${discription}</h3>
      `);
      res.send();


    });
  });
});
