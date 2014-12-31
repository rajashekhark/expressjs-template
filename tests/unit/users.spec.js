var express = require('express');
var request = require('supertest');
var sinon = require('sinon');
var should = require('chai').should();
var Q = require('q');
var users = require('../../routes/users');
var storage = require('../../services/storage');
var app = require('../../app');

describe('users api', function (){

	var testUsers = [
		{id:1, name:'testUser1'},
		{id:2, name:'testUser2'}
	];

	describe('GET /', function (){

		beforeEach(function(){
			sinon.stub(storage, 'getStoreConnection').returns(Q.resolve({}));
			sinon.stub(storage, 'listAllUsers').returns(Q.resolve(testUsers));
		});

		afterEach(function(){
			storage.getStoreConnection.restore();
			storage.listAllUsers.restore();
		});

		it('should respond with status 200 on success.', function (done){

			request(app)
			.get('/users')
			.end(function (err, res){
				res.status.should.equal(200);
				res.body.length.should.equal(2);
				if (err){
					return done(err);
				}
				done();
			});

		});

		it('should respond with status 500 on error.', function (done){

			storage.listAllUsers.restore();
			sinon.stub(storage, 'listAllUsers').throws(new Error('error occured'));

			request(app)
			.get('/users')
			.end(function (err, res){
				res.status.should.equal(500);
				if (err){
					return done(err);
				}
				done();
			});

		});

	});

});
