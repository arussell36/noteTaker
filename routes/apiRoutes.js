const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const router = require('express').Router();
let noteID = '';

/* get the notes */
router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8').then(data => {
        // console.log(data);
        let notes = JSON.parse(data);
        res.json(notes);
        // console.log(noteID);
    });
});

router.post('/notes', (req, res) => {
    let newNote = req.body;
    // console.log(newNote);
    readFileAsync('./db/db.json', 'utf8').then(data => {
        let refined = JSON.parse(data);
        // DETERMINES THE QUANTITY OF NOTES AND PRESCRIBES A NOT YET USED NUMBER VALUE //
        noteID = `${refined.length}${newNote.title}`;
        // console.log(noteID)
        // console.log(refined);
        newNote['id'] = noteID;
        refined.push(newNote);

        // console.log(refined);
        writeFileAsync('./db/db.json', JSON.stringify(refined)).then(data => {
            // console.log(data)
            res.send();
        })
    });
});


router.delete('/notes/:id', (req, res) => {
    // WHEN CLICKED IT PULLS THE ID OF THE NOTE //
    let noteNum = req.params.id;
    console.log(noteID);
    readFileAsync('./db/db.json', 'utf8').then(data => {
        const notes = JSON.parse(data);
        console.log(notes);
        const result = notes.filter(note => {
            return note.id !== noteNum
        });
        console.log(result);
        writeFileAsync('./db/db.json', JSON.stringify(result)).then(data => {
            // console.log(data)
            res.send();
        });
    });
});


module.exports = router; 