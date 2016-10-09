var stripe_ops = require('../lib/stripe_ops')(process.env.STRIPE_SECRET_KEY);
var async = require('async');




var test_cust = {};
var test_card = {};
var test_card_token = "";


async.series([
    function(callback){
      console.log("Creating a Test Customer");
      stripe_ops.create_customer("Test Customah Brah!", function(err, customer){
        if(err) return callback(err);
        test_cust = customer;
        console.log("Created a test customer: " + customer.id);
        callback();
        }
      )
    },
    function(callback){
      console.log("Fetching a customer, should equal:" + test_cust.id);
      stripe_ops.fetch_customer(
        test_cust.id,
        function(err, customer){
          if (err) return callback(err);
          console.log("Customer fetched.  Id =" + customer.id);
          callback()
        }
      )
    },
    function(callback){
      console.log("Fetching All Customerss");
      stripe_ops.fetch_all_customers(false, function(err, customers){
          if(err) return callback(err);
          console.log("All customers fetched. The Number of customers is:" + customers.data.length);
          callback();
        }
      );
    },
    function(callback){
      console.log("Fetching Random Customer");
      stripe_ops.fetch_random_customer( function(err, rand_customer){
          if(err) return callback(err);
          console.log("Random Customer Fetched: " + rand_customer.id);
          callback()
        }
      );
    },
    function(callback){
      console.log("Creating a test credit card token");
      stripe_ops.create_test_credit_card_token(
        function(err, card){
          if(err) return callback(err);
          test_card = card;
          test_card_token = card.id;
          console.log("Test card created successfully:" + test_card_token)
          callback()
        }
      )
    },
    function(callback){
      console.log('Setting the default credit card');
      stripe_ops.new_default_card(
        test_cust.id,
        test_card_token,
        function(err, customer){
          if(err) return callback(err);
          console.log( "Customer: " + customer.id + " default source set to: " + customer.default_source );
          console.log("Credit Card Created: " + JSON.stringify(customer.sources.data, null, '\t'))
          test_cust = customer;
          callback();
        }
      )
    },
    function(callback){
      console.log("Fetching test customer, default_source(the credit card) should equal: " + test_cust.default_source);
      stripe_ops.fetch_customer(
        test_cust.id,
        function(err, customer){
          if (err) return callback(err);
          console.log("Customer fetched.  default_source = " + test_cust.default_source);
          callback()
        }
      )
    },
    function(callback){
      console.log("Deleting the card from customer: " + test_cust.id);
      stripe_ops.delete_card(
        test_cust.id,
        test_cust.default_source,
        function(err, confirmation){
          if(err) return callback(err)
          console.log(confirmation);
          callback();
        }
      )
    },
    function(callback){
      console.log("Fetching test customer, default_source(the credit card) should equal null");
      stripe_ops.fetch_customer(
        test_cust.id,
        function(err, customer){
          if (err) return callback(err);
          test_cust = customer;
          console.log("Customer fetched.  default_source =" + test_cust.default_source);
          callback()
        }
      )
    },
    function(callback){
      console.log("Deleting a customer");
      stripe_ops.delete_customer(
        test_cust.id,
        function(err, confirmation){
          if(err) return callback(err);
          console.log(confirmation);
          callback();
        }
      )
    }
  ],
  function(err) {
    //This is the final callback
    if(err) {
      // cleanup
      console.log("Error encountered:  !!!!!!!!!!!!!!!!!!");
      return console.log(err);
    }
  }
);