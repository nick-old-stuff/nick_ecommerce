// This module operates only on the Mongo database.

module.exports = function(database_connection_string){

  var mongoose = require('mongoose');
  // test for database connection/only open if not present(allow modularity)
  if(!mongoose.connection.readyState){
    mongoose.connect(database_connection_string);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
  }

  var util = require('./util')
  var User = require('../schemas/user').model;


  var create_customer = function(username, stripe_id, callback){
    var params = {
      username: username,
      service_id:{
        stripe: stripe_id,
      }
    }
      User.create(params,function (err, user) {
        util.throw_or_log.call(this, err, user, callback);
      });
  };

  var fetch_customer = function(username, callback){
        User.findOne(
          { 'username': username },
          function (err, person) {
            util.throw_or_log.call(this, err, person, callback);
          }
        )
  }

  var delete_customer = function(username, callback){
    User.remove(
      { username: username },
      function (err, doc) {
        util.throw_or_log.call(this, err, doc, callback);
    });
  }


  return {
    create_customer: create_customer,
    fetch_customer: fetch_customer,
    delete_customer: delete_customer
  }

}