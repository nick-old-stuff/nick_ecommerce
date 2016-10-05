module.exports = function(stripe_secret_key){

        var stripe = require('stripe')(stripe_secret_key);



        // testing and dev helpers
        var output_stripe_keys = function(){
          console.log(stripe_secret_key);
        }

        var create_test_credit_card= function(callback){
          create_credit_card(
            '4242424242424242',
            12,
            2017,
            '123',
            function(card){
              console.log('test card created');
              callback(card);
            }
          );
        }

        // if a callback is provided it  will return the asynchronous callback when done
        var create_customer = function(description, callback){
          stripe.customers.create({
              description: description
            },function(err, customer){
              // dirty(imo) javascript hack to get it to run in this scope and allow DRY coding.
              // a function should have the scope of where it's USED not where it's defined amirite?
              completion_action.call(this,
                err,
                customer,
                "Customer Created Successfully",
                callback )
            }
          );
        };

        // saves an http request for performance
        var create_customer_with_card = function(description, source_token, callback){
          stripe.customers.create({
              description: description,
              source: source_token
            },function(err, customer){
              // dirty(imo) javascript hack to get it to run in this scope and allow DRY coding.
              // a function should have the scope of where it's USED not where it's defined amirite?
              completion_action.call(this,
                err,
                customer,
                "Customer Created Successfully",
                callback )
            }
          );
        };


        // use this to  get a token
        var create_credit_card = function(card_num, exp_month, exp_year, cvc, callback){
          stripe.tokens.create({
              card: {
                "number": card_num,
                "exp_month": exp_month,
                "exp_year": exp_year,
                "cvc": cvc
              }
            }, function(err, token) {
                // dirty(imo) javascript hack to get it to run in this scope and allow DRY coding.
                // a function should have the scope of where it's USED not where it's defined amirite?
                completion_action.call(this,
                  err,
                  token,
                  "Card Created Successfully",
                  callback )
            }
          );
        }

        var  change_default_card = function(){

        }




        var delete_all_cards = function(){


        }

        var delete_credit_card = function(card_id){

        }


        // this is just a finishing action for all of the above methods
        var completion_action = function(err,  obj, success_message, callback) {
          // asynchronously called upon completion
          //failure: return with error
          if (err) {
            console.log(err);
            if (callback) return callback(err);
          }
          //success!
          console.log(success_message);
          console.log(obj);
          if (callback) return callback(obj);
        }


        return {
          create_customer: create_customer,
          create_customer_with_card: create_customer_with_card,
          output_stripe_keys: output_stripe_keys,
          create_credit_card: create_credit_card,
          create_test_credit_card: create_test_credit_card
        }

};