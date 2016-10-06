module.exports = function(database_connection_string){

  var mongoose = require('mongoose');
  mongoose.connect(database_connection_string);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));


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

  var fetch_customer = function(username, callback){
        User.findOne({ 'username': username }, function (err, person) {
          (function() {
                throw_or_log.call(this, err, person, callback);
          })();
        })
  }



  var delete_customer = function(username){}
  var create_credit_card = function(){}
  var fetch_credit_card = function(){}


    // This method is basically so the user can be lazy and not have
  // to implement a callback and will still get logging.
  // It checks if a call back is present.
  // If so it throws either the error or the object to the callback.
  // If a callback is not present  it logs those.
  var throw_or_log = function (err, obj, callback){
    if (callback){
      if (err) {
        return callback(err);
      } else {
        return callback(false, obj);
      }
    } else {
      if (err) {
        console.log(err);
      } else {
        console.log(obj)
      }
    }
  }

  return {
    create_customer: create_customer,
    fetch_customer: fetch_customer
  }

}