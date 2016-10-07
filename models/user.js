// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
// required with no defaults: username, service_id.stripe
// note: may need to be refactored as use requirements get more complex,
// i.e. needing to add address to a business have to make an address model.
// or giving recipients their own schema maybe
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, default: "Uses Stormpath for auth", required: true }, //note: not used currently, placeholder for when migrate from Stormpath.
  active: { type: Boolean, default: true, required: true },
  admin: { type: Boolean, default: false},
  first_name: String,
  middle_name: String,
  last_name: String,
  credit_card_token: String,
  phone: {
    primary: String,
    secondary: String
  },
  email: {
    primary:String,
    secondary: String
  },
  mailing_address:{
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  shipping_address:{
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  service_id:{
    stripe: { type: String, required: true },
    stormpath: {type: String, required: true}
  },
  recipients: [
    {
      name: { type: String, required: true },
      phone: { type: Number, required: true },
      interval: { type: Number, required: true, default: 0 },
      number_sent: { type: Number, required: true, default: 0 }
    }
  ],
  account:{
    messages_used: { type: Number, default: 0 },
    messages_remaining: { type: Number, default: 0 },
    amount_spent: { type: Number, default: 0 }
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;