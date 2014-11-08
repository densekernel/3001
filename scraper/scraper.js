var request = require('request');
var moment = require('moment');
var fs = require('fs');
var path = require('path');
var __ = require('highland');
var async = require('async');

function download(t, cb) {
  var url = 'http://tubestatus.net/timeline/date/'+t;
  var filepath = path.resolve('raw/'+t+'.html');
  var filestream = fs.createWriteStream(filepath);
  console.log("storing", t);
  return request(url)
    .on('end', function() { cb(null); })
    .on('error', function() { cb(null); })
    .pipe(filestream);
}

function scrape(from, days, concurrent) {
  var time = moment(from);
  var times = [];

  for (var i=0; i <= days; i++) {
   times.push(time.subtract(1, 'days').format('YYYY-MM-DD'));
  }

  async.eachLimit(times, concurrent, download, function(err){
    console.log("done");
  });
};

var time = moment();
var times = [];
var days = 814; // 814
var offset = 587;
var concurrent = 10;
time.subtract(offset, 'days');

console.log(time.format('YYYY-MM-DD'))

scrape(time, days - offset, concurrent)