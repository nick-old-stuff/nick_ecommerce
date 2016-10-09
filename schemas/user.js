// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// set the discriminator key
var options = {discriminatorKey: 'kind'};

// create a schema
// required with no defaults: username, service_id.stripe
// note: may need to be refactored as use requirements get more complex,
// i.e. needing to add address to a business have to make an address model.
// or giving recipients their own schema maybe
var user_schema = new Schema({
      username: { type: String, required: true, unique: true },
      password_hash: { type: String, default: "stormpath handled", required: true }, //note: not used currently, placeholder for if migrate from Stormpath.
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
      },
      created_at: { type: Date, default: Date() },
      updated_at: Date
    }, options);

var user_model =  mongoose.model('User', user_schema );



// make this available to our users in our Node applications
module.exports = {
        schema: user_schema,
        model: user_model
      }