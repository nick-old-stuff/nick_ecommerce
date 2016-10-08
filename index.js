// put stripe  secret key in the parameter here
var stripe_ops = require('./lib/stripe_ops')(process.env.STRIPE_SECRET_KEY);
// put mongo databases url here along with the database as a slash parameter
var data_ops = require('./lib/data_ops')('mongodb://localhost/catfacts');
var async = require('async');




var create_customer = function(username, stormpath_id, completion_action){

  var stripe_description = "Customer Object for: " + username + ".";
  var stripe = "";

  async.series([
    function(callback){
        // create customer in stripe and set stripe_id variable after completion
        stripe_ops.create_customer(
          stripe_description,
          function(err, customer){
            if(err) return callback(err);
            stripe  = customer;
            return callback();
          });
      },
    // create the object  in the database with the stripe_id variable set
    function(callback){
        data_ops.create_customer(
          username,
          stripe.id,
          stormpath_id,
          function(err){
            if(err) return callback(err);
            return callback();
          }
        )
      }
    ],
    function(err) {
      //This is the final callback
      if(err) {
        // cleanup
        console.log("Error encountered: Rolling Back Operations");
        stripe_ops.delete_customer(stripe.id);
        return console.log(err);
      }
      console.log("Customer created successfully!!")
    }
  );
}


// Stripe/DB ops
var new_default_card = function(username, stripe_customer_id, stripe_card_token){
  var stripe_card_info = "";

  async.series([
    function(callback){
        // create customer in stripe and set stripe_id variable after completion
        stripe_ops.new_default_card(
          stripe_customer_id,
          stripe_card_token,
          function(err, customer){
            if(err) return callback(err);
            stripe_card_info  = customer;
            return callback();
          });
      },
    // create the object  in the database with the stripe_id variable set
    function(callback){
        data_ops.create_customer(
          username,
          stripe.id,
          stormpath_id,
          function(err){
            if(err) return callback(err);
            return callback();
          }
        )
      }
    ],
    function(err) {
      //This is the final callback
      if(err) {
        // cleanup
        console.log("Error encountered: Rolling Back Operations");
        stripe_ops.delete_customer(stripe.id);
        return console.log(err);
      }
      console.log("Customer created successfully!!")
    }
  );
}

var delete_default_card = function(username){}
var add_messages = function(username, money_amount){}





 module.exports = {
    create_customer: create_customer,
    fetch_customer: data_ops.fetch_customer,
    add_messages: data_ops.add_messages
    };