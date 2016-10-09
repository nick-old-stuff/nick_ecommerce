// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var credit_card_schema = new Schema({
  brand: {type: String, required: true },
  country: {type: String, required: true },
  exp_month: {type: Number, required: true },
  exp_year: {type: Number, required: true },
  last4: {type: Number, required: true },
  zip: {type: Number, required: true },
  stripe_id: {type: String, required: true },
  created_at: { type: Date, default: Date() },
  updated_at: Date
});


var credit_card_model =  mongoose.model('CreditCard', credit_card_schema);


// make this available to our users in our Node applications
module.exports = {
    schema: credit_card_schema,
    model: credit_card_model
  }