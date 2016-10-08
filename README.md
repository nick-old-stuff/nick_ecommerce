## This is an simple E-Commerce API

* (Please note: These docs are minimal because I wasn't expecting anyone but myself to really use this.
If you have any issues please let me know: `NickKiermaier@gmail.com` .  I will answer any questions, help troubleshoot, and update the docs much more fully(er?). )

### Goal
* Managing a Stripe and Mongo store requires managing several asynchronous calls and state.
* Without this libary to  create a customer involves:
  1. Creating a customer in Stripe
  2. Creating a customer in Mongo
  3. Setting the associated Stripe id in the Mongo model
  4. Handling errors and rollback in case any one of the chain of asynchronous calls fails

* With this library you just call: ` create_customer("user@here.com", callback) `
* The Stripe account will be created, an entry in Mongo is created, and the associated Stripe Id is populated in the  mongo model. Also any failures will stop execution and rollback idempotently.

### Requirements:
* A Stripe account and secret key
* A running Mongo database

## To use
* In index.js you just put your Stripe account and Secret Key information where it's indicated.
* Thats it, it should work!(?)