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

  // change the customers default card
  // Note: passing in stripe_customer_id saves a database call and shortens asynchronous chain
  var new_default_card = function(username, stripe_customer_id, stripe_card_token){
    var stripe_card = {};


    async.series([
      function(callback){
          // create customer in stripe and set stripe_id variable after completion
          stripe_ops.new_default_card(
            stripe_customer_id,
            stripe_card_token,
            function(err, customer){
              if(err) return callback(err);
              var new_cc = customer.sources.data;
              stripe_card.brand = new_cc.brand;
              stripe_card.country = new_cc.country;
              stripe_card.last4 = new_cc.last4;
              stripe_card.exp_month = new_cc.exp_month;
              stripe_card.exp_year = new_cc.exp_year;
              stripe_card.stripe_id = new_cc.id;
              stripe_card.zip = new_cc.zip;
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




  var delete_default_card = function(username){}
  var add_messages = function(username, money_amount){}



    return {
      create_customer: create_customer,
      new_default_card: new_default_card
    }

} // end main module.exports