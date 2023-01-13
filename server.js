const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
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

app.delete('/api/notes/:id', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data).filter(note => note.id !== req.params.id);
  const stringifyedNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', stringifyedNotes);
  res.json('note deleted');
});

app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));