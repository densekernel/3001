var pg = require('pg');
var express = require('express');
var app = express();
var fs = require('fs');

// Connect to postgres
var conString = "postgres://postgres:bikepass@localhost/bikedata";
var client = new pg.Client(conString);

// API routes
app.get('/', function(req, res) {
  fs.readFile('ref.txt', function(err, content) {
    if(err) {
      return console.error('Could not serve text file.');
    }
    res.type('text/plain');
    res.send(content);
  });
});

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
      res.json(result.rows);
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

app.get('/station/:id/data/:start/:end', function(req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('Could not connect to postgres.', err);
    }
    console.log('Querying...');
    client.query('SELECT * FROM live WHERE stationid = $1 AND sampletime > $2 AND sampletime < $3', 
      [req.params.id, req.params.start, req.params.end], function(err, result) {
      if (err) {
        return console.error('Error running query', err);
      }
      res.type('text/plain');
      res.json(result.rows);
    });
  });
});

app.get('/station/data/:start/:end', function(req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('Could not connect to postgres.', err);
    }
    console.log('Querying...');
    client.query('SELECT * FROM live WHERE sampletime > $1 AND sampletime < $2', 
      [req.params.start, req.params.end], function(err, result) {
      if (err) {
        return console.error('Error running query', err);
      }
      res.type('text/plain');
      res.json(result.rows);
    });
  });
});


app.listen(5000);
