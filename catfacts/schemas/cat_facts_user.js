// EXTENSION
// This is accomplished through Mongoose discriminators
// NOTE: It still save to the same Collection of the Model that it is extending!!!!

// grab the things we need
var mongoose = require('mongoose');

// base
var User = require('../../schemas/user');


// set the discriminator key
var options = {discriminatorKey: 'kind'};

// create a schema
// this is an extended schema, based on the base lib/user schema.
var cat_facts_user_schema = new mongoose.Schema({
  service_id: {
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
  }
}, options)


// create intermediate Base model
var BaseUser = User.model

// create final model which is the union of the Base model and  the  cat_facts schema
var cat_facts_user_model = BaseUser.discriminator('CatFactsUser', cat_facts_user_schema );


// make this available to our users in our Node applications
module.exports = {
    schema: cat_facts_user_schema,
    model: cat_facts_user_model
  }