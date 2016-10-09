var main_ops = require('../lib/main_ops')(process.env.STRIPE_SECRET_KEY, 'mongodb://localhost/catfacts');
var stripe_ops = require('../lib/stripe_ops')(process.env.STRIPE_SECRET_KEY);
var async = require('async');

//fake data
var faker = require('faker');
var username = faker.internet.email()
var mongo_customer = "";
var stripe_card_token = "";


async.series([
    function(callback){
      console.log("Creating Stripe/Mongo Customer!");
      main_ops.create_customer(username,
        function(err, mongo_user){
          if(err) return callback(err);
          console.log(
            "User created! stripe_id= " + mongo_user.service_id.stripe + " mongo username: " + mongo_user.username
          );
          mongo_customer = mongo_user;
          callback();
        }
      )
    },
    function(callback){
      console.log("Reading Customer");
      main_ops.read_customer(mongo_customer.username,
        function(err, customer){
          if(err) return callback(err);
          console.log("Customer read successfully: " + customer.username);
          callback();
        }
      )
    },
    function(callback){
          console.log("Creating test credit card token");
          stripe_ops.create_test_credit_card_token(
            function(err,card){
              if(err) return callback(err);
              stripe_card_token = card.id;
              console.log("Token Created: " + card.id);
              callback();
            }
          )
    },
    function(callback){
        console.log("Updating default card!")
        main_ops.update_default_card(mongo_customer.service_id.stripe, stripe_card_token,
          function(err, new_card){
            if(err) return callback(err);
            console.log("New default card for customer: " + mongo_customer.username + " is: " + JSON.stringify(new_card, null, '\t') );
            callback();
          }
        )
    },
    function(callback){
      console.log("Reading default card!");
      main_ops.read_default_card(mongo_customer.service_id.stripe,
        function(err, card){
          if(err) return callback(err);
          console.log("Read card successfully: " + JSON.stringify(card, null, '\t') )
          callback(err);
        }
      )
    },
    function(callback){
      console.log("Deleting default card");

    },
    function(callback){
      console.log("Deleting Customer");
      main_ops.delete_customer(mongo_customer.username,
        function(err, confirmation){
          if(err) return callback(err);
          console.log("Customer successfully deleted: " + JSON.stringify(confirmation) );
          callback();
        }
      )
    },
  ],
  function(err){
    console.log('Final Callback');
    if(err) {
      // cleanup
      console.log("Error encountered:  !!!!!!!!!!!!!!!!!!");
      return console.log(err);
    }
  }
)
