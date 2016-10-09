var main_ops = require('../lib/main_ops')(process.env.STRIPE_SECRET_KEY, 'mongodb://localhost/catfacts');

//fake data
var faker = require('faker');
var username = faker.internet.email()



//Starting tests
main_ops.create_customer(username,
  function(err, data){
    if(err) return console.log(err);
    console.log(data)
  }
 )