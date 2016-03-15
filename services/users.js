'use strict'
var Promise = require('bluebird');
var Users = Promise.promisifyAll(require('../database/users'));

exports.findOneByQuery = function(query) {
    return Users.findOneAsync(query);
};

exports.find = function(query) {
    return Users.findAsync(query);
};

exports.createUser = function(user) {
    return Users.createAsync(user);
};

exports.addFavorite = function(user_id, song_id){
    return Users.findOneAndUpdateAsync(
        {_id: user_id},
        {$push: {favoriteSongs: song_id}},
        {new: true}
    );
};

exports.getnewestUsers = function (limit) {
    limit = typeof limit !== 'undefined' ? limit : 3;
    return Users.find({}).sort('-createdAt').limit(limit);
};

exports.removeFavorite = function(user_id, song_id){
    return Users.findOneAndUpdateAsync(
        {_id: user_id},
        {$pop: {favoriteSongs: song_id}},
        {new: true}
    );
};