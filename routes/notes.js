var express = require('express');
var Note = require("../models").Note;
var mockNotes = require("../note_fixture");
var router = express.Router();

/* GET notes listing. */
router.get('/', function(req, res, next) {
  Note.findAll()
    .then(function(notes) {
      res.send(notes);
    });
});

router.post('/add', function(req, res, next) {
  var note = {
    title: req.body.title,
    desc: req.body.desc
  };
  Note.build(note)
    .save()
    .then(function(newNote) {
      res.send(newNote);
    })
    .catch(function(errors) {
      res.status(500).send(errors.errors.map(function(err) {
        return { message: err.message, path: err.path }
      }));
    });
});

router.post("/update", function(req, res, next) {
  var noteId = parseInt(req.body.id);
  if (!noteId) {
    res.status(500).send("Incorrect note id.");
    return;
  }
  Note.update({
    title: req.body.title,
    desc: req.body.desc
  }, { where : { id: noteId}})
    .then(function() {
      res.send({success: true});
    })
    .catch(function(err) {
      res.status(500).send( { success: false, message: err.message} );
    })
});

router.delete("/delete/:noteId", function(req, res, next) {
  var noteId = parseInt(req.params.noteId);
  new Promise(function(resolve, reject) {
    if (!noteId) {
      reject({message: "Incorrert note id", status: 404})
    }
    else {
      resolve(noteId);
    }
  }).then(function(noteId) {
    return Note.findById(noteId);
  }).then(function(note) {
    if (!note) {
      return Promise.reject({message: "Note not founded.", status: 404});
    }
    return note.destroy()
  }).then(function() {
    res.send({ success: true });
  }).catch(function(err) {
    res.status(err.status || 500).send({ success: false, message: err.message});
  });
});


module.exports = router;
