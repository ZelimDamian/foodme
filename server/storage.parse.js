var Parse = require("parse").Parse;
var Restaurant, query;

var ParseStorage = function() {
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

ParseStorage.prototype.getAllRestaurants = function(callback) {
  query.find({
    success: function(data) {
      callback(data);
    }
  });
}

ParseStorage.prototype.initialize = function() {
   Parse.initialize("HIFdCeEJjl8hVhDjsYaa3wFCJe08O9wJEkuxhHpO", "SdGuMuHTD1UqwUKKrNeynIx4zekAaqtZ9dJsbp2u");
   
   Restaurant = Parse.Object.extend("Restaurant");
   query = new Parse.Query(Restaurant)
}

exports.ParseStorage = ParseStorage;
