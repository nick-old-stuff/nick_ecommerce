var stripe_ops = require('./stripe_ops')(process.env.STRIPE_SECRET_KEY);
var data_ops = require('./database_ops')('mongodb://localhost/catfacts');
var async = require('async');



var fetch_customer = function(){

}


var simple_create_customer = function(username, completion_action){

  var stripe_description = "Customer Object for: " + username + ".";
  var stripe_id = "";

  async.series([
    function(callback){
        // create customer in stripe and set stripe_id variable after completion
        stripe_ops.create_customer(
          stripe_description,
          function(customer){
            stripe_id = customer.id;
            callback();
          });
        //-------------------------------
      },
    // create the object  in the database with the stripe_id variable set
    function(callback){
        data_ops.create_customer()
      }
    ],
    function(err) {
      //This is the final callback
      completion_action(err);
    }
  );
}



var update_credit_card = function() {
  //add to Stripe
  //add to Mongo
}





var update_customer = function(){

}



var fetch_credit_card = function(){

}















var test_module = function(text){
  console.log(text);
}



 module.exports = {
    quick_create_customer: quick_create_customer
    };