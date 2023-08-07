const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


router.get('/fetchnotes', fetchuser, async (req, res) => {


    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }

})
// Route 2 :  Add notes using  : POST '/api/notes/addnotes' 

router.post('/addnotes', fetchuser, [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNotes = await notes.save();
        res.json(savedNotes);


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }


})

// Route 3 :  update exixting notes using  : PUT '/api/notes/updatenotes' 

router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    const newNotes = {};

    if (title) {
        newNotes.title = title;
    }

    if (description) {
        newNotes.description = description;
    }

    if (tag) {
        newNotes.tag = tag;
    }

    let notes = await Notes.findById(req.params.id);
    if (!notes) {
        return res.status(404).send("not found");
    }

    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
    }

    notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })

    res.json({ notes });
})

// Route 4 :  delete exixting notes using  : DELETE '/api/notes/deletenotes' 

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {

        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("not found");
        }

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        notes = await Notes.findByIdAndDelete(req.params.id)

        res.json({message : "deleted successfully"});

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");

    }

})

module.exports = router