const app = require('express').Router();
const fs = require('fs');
const { v4: uuid4 } = require('uuid');

app.get('/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  const newNote = {
    ...req.body,
    id: uuid4()
  };
  notes.push(newNote);
  const stringifyedNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', stringifyedNotes);

  res.json('successfully saved');
});

app.delete('/notes/:id', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data).filter(note => note.id !== req.params.id);
  const stringifyedNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', stringifyedNotes);
  res.json('note deleted');
});

module.exports = app;