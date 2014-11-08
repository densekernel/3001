var request = require('request');
var moment = require('moment');
var fs = require('fs');
var path = require('path');
var __ = require('highland');
var async = require('async');

var time = moment();
var times = [];
var days = 814; // 814

for (var i=0; i <= days; i++) {
  times.push(time.subtract(1, 'days').format('YYYY-MM-DD'));
}

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

async.eachLimit(times, 10, download, function(err){
  console.log("done");
});
