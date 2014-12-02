var pg = require('pg')

var conString = "postgres//navidhg:bikepass@localhost/bikehire"

var client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('Could not connect', err);
  }
  client.query('SELECT COUNT(*) FROM static2', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(JSON.parse(result.rows[0]));
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});


//appendix b 3.3.1

