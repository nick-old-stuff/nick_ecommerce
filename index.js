var stripe_ops = require('./stripe_ops')(process.env.STRIPE_SECRET_KEY);
var data_ops = require('./database_ops')('mongodb://localhost/catfacts');
var async = require('async');



var fetch_customer = function(){

}


var quick_create_customer = function(username, completion_action){

  var stripe_description = "Customer for " + username;
  var stripe_id = "";

  async.series([
    function(callback){
        stripe_ops.create_customer(stripe_description, stripe_id, callback);
      },
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