const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const router = require('express').Router();
/* get the notes */
router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8').then(data => {
        // console.log(data);
        let notes = JSON.parse(data);
        res.json(notes);
    });
});

router.post('/notes', (req, res) => {
    let newNote = req.body;
    readFileAsync('./db/db.json', 'utf8').then(data => {
        let refined = JSON.parse(data);
        refined.push(newNote);
        writeFileAsync('./db/db.json', JSON.stringify(refined)).then(data => {
            // console.log(data)
            res.send();
        })
    });
});


module.exports = router; 