const notes =  require('express').Router();
const path = require('path');
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fs.js');

let id = 1;

notes.get('/',(req,res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

notes.post('/', (req, res) => {

   console.log(req.body);
   const {title, text} = req.body;

   if (title && text) {
       const newNote = {
        title,
        text,
        id
       }
       readAndAppend(newNote, './db/db.json');
       readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
       id++;

   } else {
       res.json('Could not post note');
   }
   

});

notes.delete('/:id', (req,res) => {

   const noteId = req.params.tip_id;
   
   readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((data) => {
        const notes = data.filter((id) => id.noteId !== noteId);

        writeToFile('./db/db.json', notes);
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    })
    
})

module.exports = notes;