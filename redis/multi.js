const redis = require('redis')
const client = redis.createClient(6379, 'localhost').on('error', function (err) {
  console.log(err)
})

client.multi().set('k3', 'v3').set('k4', 'v4').get('k3').get('k4').exec(function (err, result) {
  console.log(err, result)
})