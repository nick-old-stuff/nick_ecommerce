module.exports = function(stripe_secret_key, database_connection_string){


  // put stripe  secret key in the parameter here
  var stripe_ops = require('./stripe_ops')(stripe_secret_key);
  // put mongo databases url here along with the database as a slash parameter
  var data_ops = require('./data_ops')(database_connection_string);
  var util = require('./util')
  var async = require('async');


  var create_customer = function(username, callback){
    var stripe_description = "Customer Object for: " + username + ".";
    var stripe_user = {};
    var mongo_user = {};

    async.series([
      function(callback){
          // create customer in stripe and set stripe_id variable after completion
          stripe_ops.create_customer(
            stripe_description,
            function(err, user){
              if(err) return callback(err);
              stripe_user  = user;
              console.log("Stripe id: " + user.id)
              return callback();
            });
        },
      // create the object in the database with the stripe_id variable set
      function(callback){
          data_ops.create_customer(
            username,
            stripe_user.id,
            function(err, user){
              if(err) return callback(err);
              mongo_user = user;
              return callback();
            }
          )
        }
      ],
      function(err) {
        if (err) {
          return callback(err)
        }
        else{
          callback(false, mongo_user);
        }
      }
    );
  }

  var delete_customer = function(username, callback){
    var mongo_customer = {};
    var deleted_stripe_id = "";

    async.series([
        function(callback){
          data_ops.fetch_customer(username,
            function(err, customer){
              if(err) return callback(err);
              mongo_customer = customer;
              callback();
            }
          )
        },
        function(callback){
          data_ops.delete_customer(username,
            function(err, doc){
              if(err) return callback(err);
              callback();
            }
          )
        },
        function(callback){
          stripe_ops.delete_customer(mongo_customer.service_id.stripe,
            function(err, confirmation){
              if(err) return callback(err);
              deleted_stripe_id = confirmation.id
              callback();
            }
          )
        }
      ],
      function(err) {
        if (err) {
          return callback(err)
        }
        else{
          var output = {
            deleted: true,
            mongo: mongo_customer.id,
            stripe: deleted_stripe_id
          };
          callback(false, output);
        }
      }
    )
  }




    return {
      // customer CRUD
      create_customer: create_customer,
      read_customer: data_ops.fetch_customer,
      delete_customer: delete_customer,
      // card CRUD

      update_default_card: stripe_ops.new_default_card,
      read_default_card: stripe_ops.fetch_default_source,
      delete_default_card: stripe_ops.delete_default_card
    }

} // end main module.exports