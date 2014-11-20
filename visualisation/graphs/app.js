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

app.get("/api/v1/test", function (req, res) {

  var file = fs.createReadStream(__dirname+'/static/engineering.csv');
  var csv = file.pipe(CSVStream({objectMode: true, columns: true}));

  __(csv)
    .take(100)
    .map(function(d) {
      d.actual_time = moment(+moment(d.date).format('x')+d.time*60*60*1000);
      return d;
    })
    // .where({status:'MD'})
    .group('status')
    .map(function(x) {
      var key = Object.keys(x)[0]
      Object.keys(x).forEach(function(key) {
        x[key] = x[key].map(function(d){
          return {
            from: d.from,
            to:d.to,
            time:d.time
          };
        });
      });
      return x;
    })
    .pipe(JSONStream.stringify())
    .pipe(res);

});


var port = process.env.PORT || 1200;
var server = http.createServer(app).listen(port, function () {
  console.log("express-imessage on ", server.address().port, app.settings.env);
});