module.exports = function(database_connection_string){

  var mongoose = require('mongoose');
  mongoose.connect(database_connection_string);

  var User = require('./models/user');
  var CreditCard = require('./models/credit_card')

  var build_customer = function(){}
  var create_customer = function(){}
}