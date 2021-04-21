const redis = require('redis')
const client = redis.createClient(6379, 'localhost').on('error', function (err) {
  console.log(err)
})

client.set('home', 'beijing',function (err, result) {
  console.log(err, result)
})

client.hmset('user', 'name', 'zhangSan', 'age', '9', function (err, result) {
  console.log(err, result)
  client.hkeys('user', function (err, keys) {
    !err && keys.map(key => {
      client.hget('user', key, function (err, value) {
        !err && console.log(key, value)
      })
    })
  })
  
})
