//database
var mogodb = require('mongodb');
var mongo_client = mongodb.MongoClient;

// database connection information
// factor into  environmental variables
var mongo_host = 'mongodb://localhost:27017/'
var mongo_db = 'catfacts';
var mongo_url = mongo_host + mongo_db

//data models
var customer_model = require('./data_model/user.json');
var credit_card_model = require('./data_model/credit_card.json');


// Optimize these model clones if performance becomes an issue(see Corbins answer in link below)
// Or create legit js objects with them, but that's alot of boilerplate for a simple data object.
// http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
var create_new_customer = function(){
  return JSON.parse(JSON.stringify(customer_model));
}

var create_new_credit_card = function(){
  return JSON.parse(JSON.stringify(credit_card_model));
}

// Creates collections for each item in the array
// Will skip over duplicates.
// EX: initialize_db(['customer', 'credit_card'])
var initialize_db = function(array_of_collection_names){
    // Use connect method to connect to the Server
    mongo_client.connect(mongo_url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //logging
        console.log('Connection established to', mongo_url);
        //operations
        for (var new_collection in array_of_collection_names){
          db.createCollection(new_collection, {strict:true}, function(err, collection) {
            if(err) {
              console.log(err);
            } else{
              console.log('Collection created successfully');
              console.log(collection);
            }
          });
        }
        //Close connection
        db.close();
      }
    });
}


var add_customer = function(customer){}
var update_customer = function(customer_id, customer){}
var fetch_customer = function(customer_id){}
var delete_customer = function(customer_id){}

var add_credit_card = function(customer){}
var update_credit_card = function(customer){}
var fetch_credit_card = function(customer_id){}
var delete_credit_card = function(customer_id){}









 module.exports = {
        create_new_customer: create_new_customer,
        create_new_credit_card:create_new_credit_card
    };