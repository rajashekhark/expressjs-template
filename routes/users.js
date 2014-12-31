var express = require('express');
var storage = require('../services/storage');
var router = express.Router();
var Q = require('q');

var getUsers = function(request, response){
  storage.listAllUsers()
  .then(function(users){
    response.send(users);
  })
  .fail(function(err){
    response.status(500).send('failed to list all users');
  });
};

router.get('/', getUsers);
module.exports = router;
