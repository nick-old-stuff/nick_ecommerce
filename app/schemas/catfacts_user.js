// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;





// create a schema
// this is an extended schema, based on the lib/user schema.
var catfacts_user_schema = new Schema({


})


// create a model
var credit_card_model =  mongoose.model('CreditCard', credit_card_schema);


// make this available to our users in our Node applications
module.exports = {
    schema: credit_card_schema,
    model: credit_card_model
  }