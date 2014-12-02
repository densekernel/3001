var pg = require('pg');
var express = require('express');
var app = express();

// Connect to postgres
var conString = "postgres://postgres:bikepass@localhost/bikedata";
var client = new pg.Client(conString);

// API routes
app.get('/station', function(req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('Could not connect to postgres.', err);
    }
    console.log('Querying...');
    client.query('SELECT * FROM static', function(err, result) {
      if (err) {
        return console.error('Error running query', err);
      }
      res.type('text/plain');
      res.json(result);
    });
  });
});

app.get('/station/:id', function(req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('Could not connect to postgres.', err);
    }
    console.log('Querying...');
    client.query('SELECT * FROM static WHERE id = $1', [req.params.id], function(err, result) {
      if (err) {
        return console.error('Error running query', err);
      }
      res.type('text/plain');
      res.json(result.rows);
    });
  });
});

app.get('/station/:id/data', function(req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('Could not connect to postgres.', err);
    }
    console.log('Querying...');
    client.query('SELECT * FROM live WHERE stationid = $1', [req.params.id], function(err, result) {
      if (err) {
        return console.error('Error running query', err);
      }
      res.type('text/plain');
      res.json(result.rows);
    });
  });
});

app.listen(5000);
