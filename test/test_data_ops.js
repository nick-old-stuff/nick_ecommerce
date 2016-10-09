
var database_connection_string = 'mongodb://localhost/catfacts';
var data_ops = require('../lib/data_ops')(database_connection_string);
var async = require('async');
var faker = require('faker');


// module wide data
var test_user = {};
var test_card= {};

// fake test data
var username = faker.internet.email();
var stripe_id = faker.finance.bitcoinAddress();
var random_msg_amt = faker.random.number()


async.series(
  [
    function(callback) {
      console.log("Creating a user");
      data_ops.create_customer(username, stripe_id,
        function(err, user){
          if(err)return callback(err);
          console.log("Customer Created successfully, mongo id: " + user.id);
          test_user = user;
          callback();
        }
      )
    },
    function(callback){
      console.log("Fetching a user");
      data_ops.fetch_customer(test_user.username,
        function(err, user){
          if(err) return callback(err);
          console.log("Customer fetched successfully, mongo id: " + user.id)
          callback();
        }
      );
    },
    function(callback){
      console.log("Deleting User:" + test_user.username);
      data_ops.delete_customer(test_user.username,
        function(err, doc){
          if(err) return callback(err);
          console.log("Deletion confirmation message: " + doc)
        }
      )
    }
  ],
  function(err){
    console.log('Final Callback');
    if(err) {
      // cleanup
      console.log("Error encountered:  !!!!!!!!!!!!!!!!!!");
      return console.log(err);
    }
  }
);