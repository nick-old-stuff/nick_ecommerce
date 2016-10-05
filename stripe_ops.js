module.exports = function(stripe_key){

        var stripe = require('stripe')(stripe_key);

        var output_stripe_key = function(){
          console.log(stripe_key);
        }

        // if a callback is provided it  will return the asynchronous callback when done
        // if an object is provided on the stripe_id paramter it will set it to the stripe customer id.
        var create_customer = function(description, stripe_id, callback){
          stripe.customers.create({
              description: description
            },
            completion_action
          );
        };

        // saves an http request, ups performance
        var create_customer_with_card = function(description, source_token, stripe_id, callback){
          stripe.customers.create({
              description: description,
              source: source_token
            },
            completion_action
          );
        };


        var completion_action = function(err, customer, stripe_id, callback) {
          // asynchronously called upon completion

          //failure: return with error
          if (err) {
            console.log(err);
            if (callback) return callback(err);
          }

          //success!
          console.log("Customer Created Successfully!");
          console.log(customer);
          if(stripe_id) stripe_id = customer.id;
          if (callback) return callback();
        }

        return {
          create_customer: create_customer,
          create_customer_with_card: create_customer_with_card,
          output_stripe_key: output_stripe_key
        }

};