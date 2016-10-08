// requires and  database creation(all boilerplate, just copy and paste)
var mongoose = require('mongoose');
User = require('../schemas/user')
CC = require('../schemas/credit_card')
mongoose.connect('mongodb://localhost/catfacts');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// create a new user
muh_user = new User.model

// create a random username(it's a string)
muh_user.username = Math.floor(Math.random() * 200000);


// create  a new credit card. All the fields are  required
cc = new CC.model
cc.brand =  "adfa";
cc.country = "sd"
cc.exp_month = "1"
cc.exp_year = "1"
cc.type = "adfa"
cc.last4 = "1"
cc.zip = "1"


// validate the card in memory without saving
cc.validateSync()


// add the credit card to the user
// this is example of subdocuments (the fields data type is set to the CC's schema.)
muh_user.default_credit_card = cc;

// add the credit card to the credit_card array
muh_user.credit_cards.push(cc)

// save.  Note any validation errors from subdocuments will bubble up tohere
muh_user.save(function(err){console.log(err)})