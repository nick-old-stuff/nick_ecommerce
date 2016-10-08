// This module operates only on the Mongo database.

module.exports = function(database_connection_string){

  var mongoose = require('mongoose');
  mongoose.connect(database_connection_string);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));


  var User = require('../schemas/user').model;
  var CreditCard = require('../schemas/credit_card').model;


  var create_customer = function(username, stripe_id, stormpath_id, callback){
    var params = {
      username: username,
      service_id:{
        stripe: stripe_id,
        stormpath: stormpath_id
      }
    }
      User.create(params,function (err, user) {
        throw_or_log.call(this, err, user, callback);
      });
  };

  var fetch_customer = function(username, callback){
        User.findOne(
          { 'username': username },
          function (err, person) {
            throw_or_log.call(this, err, person, callback);
          }
        )
  }

  var add_messages = function(username, message_amount, callback) {
    User.findOneAndUpdate(
      {username: username},
      {$inc: { "account.messages_remaining" : message_amount }},
      {new: true},
      function(err, user){
        throw_or_log.call(this, err, user, callback);
      }
    );
  }

  var delete_customer = function(username, callback){
    User.remove(
      { username: username },
      function (err, doc) {
        throw_or_log.call(this, err, doc, callback);
    });
  }

  // this deletes the old credit card object and adds the new credit card object
  // can remove a default credit card by setting this to empty string or null
  var update_default_credit_card = function(username, credit_card_object, callback){
    User.findOneAndUpdate(
      {username: username},
      {defalt_credit_card: credit_card_object},
      {new: true},
      function(err, user){
        throw_or_log.call(this, err, user, callback);
      }
    );
  }

  // brand, country, type are strings/ the rest are numbers (types are enforced by the ODM)
  var credit_card_factory=  function(brand, country, type, exp_month, exp_year, last4, zip){

    cc = new CreditCard.model
    cc.brand =  brand;
    cc.country = country;
    cc.exp_month = exp_month;
    cc.exp_year = exp_year;
    cc.type = type;
    cc.last4 = last4;
    cc.zip = zip;

    return cc;
  }

  var remove_default_credit_card = function(){}


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
    fetch_customer: fetch_customer,
    add_messages:add_messages,
    delete_customer: delete_customer
  }

}