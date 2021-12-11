'use strict';

const express = require('express');
const Note = require('../models').Note;
const router = express.Router();

/* Helpers */
async function parseNoteId(id) {
    const noteId = parseInt(id);

    if (Number.isNaN(noteId)) {
        throw new Error('Incorrect note id');
    }
    return noteId;
}

const handleSimpleError = res => err => res.status(err.status || 500).send({ success: false, message: err.message });
const handleSuccess = res => () => res.send({ success: true });

/* GET notes listing. */
router.get('/', function (req, res, next) {
    Note.findAll()
        .then(notes => res.send(notes))
        .catch(handleSimpleError(res));
});

router.post('/add', function (req, res, next) {
    const note = {
        title: req.body.title,
        desc: req.body.desc
    };
    Note.build(note)
        .save()
        .then(newNote => res.send(newNote))
        .catch(errors => {
            res.status(500).send(errors.errors.map(err => ({ message: err.message, path: err.path })));
        });
});

router.post("/update", function (req, res, next) {
    parseNoteId(req.body.id)
        .then(noteId => Note.update({
            title: req.body.title,
            desc: req.body.desc
        }, { where: { id: noteId } }))
        .then(handleSuccess(res))
        .catch(handleSimpleError(res))
});

router.delete("/delete/:noteId", function (req, res, next) {
    parseNoteId(req.params.noteId)
        .then(noteId => Note.findByPk(noteId))
        .then(note => {
            if (!note) {
                return Promise.reject({ message: "Note not founded.", status: 404 });
            }
            return note.destroy();
        })
        .then(handleSuccess(res))
        .catch(handleSimpleError(res));
});


module.exports = router;
