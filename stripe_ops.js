module.exports = function(stripe_secret_key){

        var stripe = require('stripe')(stripe_secret_key);

        // testing and dev helpers
        var output_stripe_keys = function(){
          console.log(stripe_secret_key);
        }


        var create_test_credit_card_token = function(callback){
          create_credit_card_token(
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
          stripe.customers.create(
            {
              description: description
            },
            function(err, customer){
              // dirty(imo) javascript hack to get it to run in this scope and allow DRY composition.
              // a function should have the scope of where it's USED not where it's defined amirite?
              completion_action.call(this,
                err,
                customer,
                "Stripe Customer Created Successfully",
                callback )
            }
          )
        };

        var delete_customer = function(){


        }


        var fetch_customer = function(customer_id, callback){
          stripe.customers.retrieve(
            stripe_id,
            function(err, customer) {
              completion_action.call(this,
                  err,
                  customer,
                  "Customer Fetched Successfully",
                  callback )
            }
          )
        }

        // creating with a card_token, saves an http request to add the token later. For performance.
        var create_customer_with_card = function(description, card_token, callback){
          stripe.customers.create({
              description: description,
              source: card_token
            },function(err, customer){
              // dirty(imo) javascript hack to get it to run in this scope and allow DRY coding.
              // a function should have the scope of where it's USED not where it's defined amirite?
              completion_action.call(this,
                err,
                customer,
                "New Customer Created Successfully",
                callback )
            }
          );
        };

        // use this to  get a token server side.  (Note: this is done client side typically.)
        var create_credit_card_token = function(card_num, exp_month, exp_year, cvc, callback){
          stripe.tokens.create({
              card: {
                "number": card_num,
                "exp_month": exp_month,
                "exp_year": exp_year,
                "cvc": cvc
              }
            }, function(err, token) {
                completion_action.call(this,
                  err,
                  token,
                  "New Card Created Successfully",
                  callback )
            }
          );
        }

        // Note: From STRIPES API:
        // Passing source (to update) will:
        // 1> create a new source object,
        // 2> make it the new customer default source
        // 3> delete the old customer default if one exists.
        // If you want to add additional sources instead of replacing the existing default,
        // use the card creation API.
        var  change_default_card = function(customer_id, card_token){
          stripe.customers.update(
            customer_id,
            {
              source: card_token
            },
            function(err, customer) {
              completion_action.call(this,
                err,
                customer,
                "Customer Updated Successfully",
                callback )
            }
          )

        }

        var delete_card = function(customer_id, card_token){
          stripe.customers.deleteCard(
            customer_id,
            card_token,
            function(err, confirmation) {
                completion_action.call(this,
                  err,
                  confirmation,
                  "Card Deleted Successfully",
                  callback )
            }
          )
        }

        var delete_all_cards = function(customer_id){ /*TBI*/ }



        // this is just a finishing action for all of the above methods
        // It logs  errors, prints success messages and objects that were operated on
        // It also returns the object that was operated on.
        var completion_action = function(err,  obj, success_message, callback) {
          // asynchronously called upon completion
          console.log(success_message);

          // javascript hack. define/execute a function in order to get the defined scope.
          (function() {
            throw_or_log.call(this, err, obj, callback);
          })();


        }

        // This method is basically so the user can be lazy and not have
        // to implement a callback and will still get logging.
        // It checks if a call back is present.
        // If so it throws either the error or the object to the callback.
        // If a callback is not present  it logs those.
        var throw_or_log = function (err, obj, callback){
          if (callback){
            if (err) {
              return callback(err);
            } else {
              return callback(false, obj);
            }
          } else {
            if (err) {
              console.log(err);
            } else {
              console.log(obj)
            }
          }
        }

        return {
          create_customer: create_customer,
          create_customer_with_card: create_customer_with_card,
          delete_customer: delete_customer,
          output_stripe_keys: output_stripe_keys,
          create_credit_card_token: create_credit_card_token,
          create_test_credit_card_token: create_test_credit_card_token,
          completion_action: completion_action,
          throw_or_log, throw_or_log
        }

};