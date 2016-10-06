var stripe_ops = require('./stripe_ops')(process.env.STRIPE_SECRET_KEY);
var data_ops = require('./data_ops')('mongodb://localhost/catfacts');
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
            if(err) callback(err);
            stripe  = customer;
            callback();
          });
      },
    // create the object  in the database with the stripe_id variable set
    function(callback){
        data_ops.create_customer(
          username,
          stripe.id,
          stormpath_id,
          function(err){
            if(err) {
              if(callback){
                return callback(err);
              } else{
                console.log(err);
              }
            }
            callback();
          }
        )
      }
    ],
    function(err) {
      //This is the final callback
      if(err) {
        // cleanup
        // delete stripe account
        stripe_ops.delete_customer(stripe.id);
        return console.log(err);
      }
      console.log("Customer created successfully!!")
    }
  );
}





var fetch_customer = function(){}
var update_credit_card = function() {}
var update_customer = function(){}
var fetch_credit_card = function(){}
var test_module = function(text){
  console.log(text);
}




 module.exports = {
    create_customer: create_customer
    };