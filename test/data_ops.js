var data_ops = require('../data_ops')('mongodb://localhost/catfacts');
var async = require('async');
var faker = require('faker');



var test_user = {};


var username = faker.internet.email();
var stripe_id = faker.finance.bitcoinAddress();
var stormpath_id = faker.finance.bitcoinAddress();
var random_msg_amt = faker.random.number()


async.series(
  [
    function(callback) {
      console.log("Creating a user");
      data_ops.create_customer(username, stripe_id, stormpath_id,
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
      console.log("Adding " + random_msg_amt +
        " messages to user. Current messages remaining: " +
        test_user.account.messages_remaining
      );
      data_ops.add_messages(test_user.username, random_msg_amt,
        function(err, user){
          if(err) return callback(err);
          test_user = user;
          console.log("Messages added successfully. New messages remaining: " +
            test_user.account.messages_remaining
          );
          callback();
        }
      )
    },
    function(callback){
      console.log("Deleting User:" + test_user.username);
      data_ops.delete_customer(test_user.username,
        function(err, doc){
          if(err) return callback(err);
          console.log("Deletion confirmation message: " + doc.result)
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