var express = require('express');
var router = express.Router();
var UsersService = require('../services/users');
var SongsService = require('../services/songs');

/* GET home page. */
router.get('/', function(req, res) {
  UsersService.getnewestUsers()
      .then(function(newestUsers) {
        SongsService.getTopSongsByRating()
            .then(function(topList){
              if (req.accepts('text/html')){
                res.render("index", {
                  topList: topList,
                  newestUsers: newestUsers
                })
              } else if(req.accepts('application/json')) {
                var resp = {};
                resp["topList"] = topList;
                resp["newestUsers"] = newestUsers;
                res.status(200).send(resp);
              }
            });
      });
});

module.exports = router;
