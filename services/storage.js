// **************************************************************
// Original module will have logic to connect to a persistent store
// **************************************************************
var Q = require('q');
var users = [
  {id: 1, name:'user1'},
  {id: 2, name:'user2'},
  {id: 3, name:'user3'}
];

var getStoreConnection = Q.fbind(function(){
  var deferred = Q.defer();
  deferred.resolve({});
  return deferred.promise.delay(1000);
});

var listAllUsers = Q.fbind(function(){
  var deferred = Q.defer();
  storage.getStoreConnection()
  .then(function(connection){
    deferred.resolve(users);
  })
  .fail(function(error){
    deferred.reject(error);
  });
  return deferred.promise.delay(1000);
});

var storage = {
  getStoreConnection: getStoreConnection,
  listAllUsers: listAllUsers
};

module.exports = storage;
