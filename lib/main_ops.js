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
        //This is the final callback
        if (err) {
        // rollback ops go here
        //return error
          return callback(err)
        }
        else{
          callback(false, mongo_user);
        }
      }
    );
  }

  // Stripe/DB ops
  var new_default_card = function(username, stripe_customer_id, stripe_card_token){
    var stripe_card_info = "";

    async.series([
      function(callback){
          // create customer in stripe and set stripe_id variable after completion
          stripe_ops.new_default_card(
            stripe_customer_id,
            stripe_card_token,
            function(err, customer){
              if(err) return callback(err);
              stripe_card_info  = customer;
              return callback();
            });
        },
      // create the object  in the database with the stripe_id variable set
      function(callback){
          data_ops.create_customer(
            username,
            stripe.id,
            stormpath_id,
            function(err){
              if(err) return callback(err);
              return callback();
            }
          )
        }
      ],
      function(err) {
        //This is the final callback
        if(err) {
          // cleanup
          console.log("Error encountered: Rolling Back Operations");
          stripe_ops.delete_customer(stripe.id);
          return console.log(err);
        }
        console.log("Customer created successfully!!")
      }
    );
  }



    return {
      create_customer: create_customer,
      new_default_card: new_default_card
    }

} // end main module.exports