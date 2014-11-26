var express = require('express');
var bodyParser = require('body-parser');

var ejs = require("ejs");
var http = require('http');
var path = require('path');
var CSVStream = require('csv-streamify');
var csv = require('csv');
var fs = require('fs');
var moment = require('moment');
var JSONStream = require('JSONStream');

var es = require('event-stream');
var __ = require('highland');

var app = module.exports = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/static"));

function getDelays(from, to) {

  var file = fs.createReadStream(__dirname+'/static/engineering.csv');
  var csv = file.pipe(CSVStream({objectMode: true, columns: true}));

  var from_u = +moment(from).format('x');
  var to_u = +moment(to).format('x');

  return __(csv)
    // .take(100)
    .map(function(d) {
      d.actual_time = moment(+moment(d.date).format('x')+d.time*60*60*1000);
      return d;
    })
    .filter(function(d) {
      var actual_time = +d.actual_time.format('x');
      return actual_time >= from_u && actual_time < to_u;
      debugger;
    })
    //.where({date:'2012-12-24'})
    .group('line')
    .map(function(x) {
      var key = Object.keys(x)[0]
      Object.keys(x).forEach(function(key) {
        x[key] = x[key].map(function(d){
          return {
            from: d.from.replace('&amp;apos;', "'"),
            to:d.to
              .replace('&amp;apos;', "'")
              .replace('&amp;', "&")
              .replace('Harrow & Wealdstone', "Harrow & Wealdston"),
            time:d.time,
            date:d.date
          };
        });
      });
      return x;
    })
}

app.get("/api/v1/delays", function (req, res) {
  if (!req.query.from || !req.query.to) {
    res.json(500, {error: "Specify to or from"});
  }

  getDelays(req.query.from, req.query.to)
    .pipe(JSONStream.stringify())
    .pipe(res);

});



var port = process.env.PORT || 1200;
var server = http.createServer(app).listen(port, function () {
  console.log("express-imessage on ", server.address().port, app.settings.env);
});