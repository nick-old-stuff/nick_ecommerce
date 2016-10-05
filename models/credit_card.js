// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CreditCardSchema = new Schema({
  brand: {type: String, required: true },
  country: {type: String, required: true },
  exp_month: {type: Number, required: true },
  exp_year: {type: Number, required: true },
  type: {type: String, required: true },
  last4: {type: Number, required: true },
  zip: {type: Number, required: true },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var CreditCard = mongoose.model('CreditCard', CreditCardSchema);

// make this available to our users in our Node applications
module.exports = CreditCard;