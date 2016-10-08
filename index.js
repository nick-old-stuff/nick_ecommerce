// put stripe  secret key in the parameter here
var stripe_ops = require('./lib/stripe_ops')(process.env.STRIPE_SECRET_KEY);
// put mongo databases url here along with the database as a slash parameter
var data_ops = require('./lib/data_ops')('mongodb://localhost/catfacts');
var main_ops = require('./lib/main_ops')(process.env.STRIPE_SECRET_KEY)('mongodb://localhost/catfacts')
var async = require('async');



 module.exports = {
    create_customer: main_ops.create_customer,
    fetch_customer: data_ops.fetch_customer,
    add_messages: data_ops.add_messages
    };