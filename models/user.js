// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password_hash: type: String, //note: saving this for when migrate from Stormpath.
  active: { type: Boolean, required: true },
  admin: Boolean,
  first_name: String,
  middle_name: String,
  last_name: String,
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
    State: String,
    zip: Number
  },
  shipping_address:{
    street: String,
    city: String,
    State: String,
    zip: Number
  },
  payment_id:{
    stripe: String
  }
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;