function(callback){
  console.log("Adding " + random_msg_amt +
    " messages to user. Current messages remaining: " +
    test_user.account.messages_remaining
  );
  custom_data_ops.add_messages(test_user.username, random_msg_amt,
    function(err, user){
      if(err) return callback(err);
      test_user = user;
      console.log("Messages added successfully. New messages remaining: " +
        test_user.account.messages_remaining
      );
      callback();
    }
  )
},