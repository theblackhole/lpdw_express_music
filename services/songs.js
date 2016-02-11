'use strict'
var Promise = require('bluebird');
var Songs = Promise.promisifyAll(require('../database/songs'));
exports.findAll = function() {
    return Songs.findAsync();
};
exports.findOneByQuery = function(query) {
    return Songs.findOneAsync(query);
};
exports.create = function(query) {
    return Songs.createAsync(query);
};
exports.update = function(id,query) {
    return Songs.updateAsync(id,query);
};