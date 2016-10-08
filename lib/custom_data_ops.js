module.exports = function(database_connection_string){


  var mongoose = require('mongoose');
  if(mongoose.connection.readyState == 0){
      mongoose.connect(database_connection_string);
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
  }


  var User = require('../schemas/user').model;
  var CreditCard = require('../schemas/credit_card').model;
  var util = require('./util')


  var add_messages = function(username, message_amount, callback) {
    User.findOneAndUpdate(
      {username: username},
      {$inc: { "account.messages_remaining" : message_amount }},
      {new: true},
      function(err, user){
        util.throw_or_log.call(this, err, user, callback);
      }
    );
  }

  return {
    add_messages: add_messages
  }


}