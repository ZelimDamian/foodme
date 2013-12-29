var mongoose = require("mongoose");
var RestaurantSchema, Restaurant;

var Storage = function() {
  var storage = [];

  this.getAll = function() {
    return storage;
  };

  this.add = function(item) {
    storage.push(item);
  };

  this.getById = function(id) {
    for (var i = 0; i < storage.length; i++) {
      if (storage[i].id === id) {
        return storage[i];
      }
    }

    return null;
  };

  this.deleteById = function(id) {
    for (var i = 0; i < storage.length; i++) {
      if (storage[i].id === id) {
        storage.splice(i, 1);
        return true;
      }
    }

    return false;
  };
};

Storage.prototype.getAllRestaurants = function(callback) {
  Restaurant.find().lean().exec(function(err, result) {
    if (!err) {
      console.log(result);
      callback(result);
    } else {
      console.log(err);
      callback(null);
    };
  });
}

Storage.prototype.initialize = function() {
  var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL ||
  'mongodb://damian:MileZ1991@ds061938.mongolab.com:61938/heroku_app20766853'    ||
  'mongodb://localhost/musteat';

  // Makes connection asynchronously.  Mongoose will queue up database
  // operations and release them when the connection is complete.
  mongoose.connect(uristring, function (err, res) {
    if (err) { 
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
  });
  
  // This is the schema.  Note the types, validation and trim
  // statements.  They enforce useful constraints on the data.
  RestaurantSchema = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },
                                        { collection : 'Restaurant' });
  
  /*({
    price: { type: Number, min: 0},
    rating: { type: Number, min: 0},
    restaurantId: { type: String },
    name: { type: Number },
    cuisine: { type: String },
    opens: { type: String },
    closes: { type: String },
    location: { type: String },
    description: { type: String },
    days: [ { type: Number } ]
  });*/
  
  Restaurant = mongoose.model('Restaurant', RestaurantSchema);

}

exports.Storage = Storage;
