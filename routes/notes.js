var express = require('express');
var models = require("../models");

var router = express.Router();

var mockNotes = [
  {
    id: 0,
    title: 'Learn Ionic',
    desc: 'The top open source framework for building amazing mobile apps.',
  },
  {
    id: 1,
    title: 'Learn Cordova',
    desc: 'Mobile apps with HTML, CSS & JS target multiple platforms with one code base free and open source',
  },
  {
    id: 2,
    title: 'Learn JavaScript',
    desc: 'JavaScript is the programming language of HTML and the Web.',
  }
];

/* GET notes listing. */
router.get('/', function(req, res, next) {
  models.Note.findAll()
    .then(function(notes) {
      notes = mockNotes;
      res.send(notes);
    });
});

module.exports = router;
