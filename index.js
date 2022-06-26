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

//#1
app.get("/api/:date?", function (req, res) {
  
  console.log("------------");
  console.log(req.params);
  
  let date = req.params.date;
  if (date==undefined) {
    console.log("-Empty date parameter");
    date=Date.now();
  } else if (!isNaN(date) && (date+"").indexOf("-"==-1) && Number(date)>10000000) {
    console.log("-Unix time parameters");
    date=new Date(Number(date));
  }
  
  let rs = {
    "unix": Number(Math.floor(new Date(date).getTime() ).toFixed(0)),
    "utc": new Date(date).toUTCString()
  };

  console.log(rs["unix"]+", "+rs["utc"]);
  if (isNaN(rs["unix"]) || rs["unix"] == undefined || rs["utc"]=='Invalid Date') {
    rs={error: "Invalid Date"};
  }
  console.log(rs);
  res.json(rs);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
