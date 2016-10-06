module.exports = function(database_connection_string){

  var mongoose = require('mongoose');
  mongoose.connect(database_connection_string);

  var User = require('./models/user');
  var CreditCard = require('./models/credit_card')


  var create_customer = function(username, stripe_id, stormpath_id, callback){
    var params = {
      username: username,
      service_id:{
        stripe: stripe_id,
        stormpath: stormpath_id
      }
    }
      User.create(params,function (err) {
        if(err) return callback(err);
        console.log("Mongo User created successfully!");
        return callback();
      });
  };


  var fetch_customer = function(){}
  var delete_customer = function(username){}
  var create_credit_card = function(){}
  var fetch_credit_card = function(){}

  return {
    create_customer: create_customer
  }

}