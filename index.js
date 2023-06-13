// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// inserted by Ken
app.get("/api/:date?", function (req, res) {
  if(req.params.date == null){
    res.json({"unix":Date.now(),"utc":new Date(Date.now()).toUTCString()});
  }else if(/[0-9]{4}[-][0-9]{1,2}[-][0-9]{1,2}/.test(req.params.date)){
    res.json({"unix":Math.floor(new Date(req.params.date).getTime()), "utc":new Date(req.params.date).toUTCString()});
  }else if(new Date(parseInt(req.params.date)) != "Invalid Date"){
    res.json({"unix":parseInt(req.params.date), "utc":new Date(parseInt(req.params.date)).toUTCString()});
  }else if(new Date(req.params.date) == "Invalid Date") {
    res.json({"error":"Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
