var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);





var create_new_stripe_customer = function(callback){
  stripe.customers.create({
      description: "Account for " + ""
    },
    function(err, customer) {
      // asynchronously called upon completion
      // do data handling here.....
      if (err) return callback(err);
      console.log(customer);
      callback();
  });
};



var create_new_customer_account = function(account, callback){
    account.spent = 0;
    account.totalMessagesUsed = 0;
    account.totalMessagesRemaining = 0;
    account.recipients={};
    account.save(function(err) {
      if (err) return callback(err);
      callback();
    });
};


 module.exports = {
        create_new_customer_account: create_new_customer_account,
        create_new_stripe_customer: create_new_stripe_customer
    };