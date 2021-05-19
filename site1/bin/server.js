const express = require('express');
var redis = require('redis');
var client = redis.createClient(6379, 'redis'); //creates a new client

const app = express();

client.on('connect', function() {
  console.log('connected');
});

client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

app.get('/', (req, res) => {
  client.hgetall('frameworks', function(err, reply) {
      res.json({
          message: reply
      });
  });
});

app.listen(8000, () => {
    console.log('server is listening on port 2020');
});
