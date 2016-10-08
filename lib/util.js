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


  module.exports = {
    throw_or_log: throw_or_log
  }