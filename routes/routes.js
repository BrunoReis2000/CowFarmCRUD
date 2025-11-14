const express = require('express');
const router = express.Router();
const Cow = require('../models/cows');
const multer = require('multer');
const fs = require('fs');
const { type } = require('os');

//image Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: storage }).single('image');






router.post('/add', upload, async (req, res) => {
    try {
        const cow = new Cow({
            image: req.file ? req.file.filename : undefined,
            tag: req.body.tag,
            weight: req.body.weight,
            breedCount: req.body.breedCount,
            lastTimeCalved: req.body.lastTimeCalved
        });

        await cow.save(); // save() returns a Promise now
        req.session.message = { type: 'success', message: 'Cow added successfully!' };
        res.redirect('/');
        console.log(req.session.message);
        
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});


//get all animals route
router.get('/', async (req, res) => {
    try {
        const cows = await Cow.find().exec(); // promise-based
        const message = req.session ? req.session.message : undefined;
        if (req.session) delete req.session.message; // consume flash message
        res.render('index', {
            cows: cows,
            title: 'Cow Farm Management System',
            message: message
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/update/:cowId', upload, async (req, res) => {
    const id = req.params.cowId;
    let newImage = '';

    if (req.file) {
        newImage = req.file.filename;
        try {
            fs.unlinkSync('./uploads/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        newImage = req.body.old_image;
    }

    try {
        await Cow.findByIdAndUpdate(id, {
            image: newImage,
            tag: req.body.tag,
            weight: req.body.weight,
            breedCount: req.body.breedCount,
            lastTimeCalved: req.body.lastTimeCalved,
        });

        req.session.message = {
            type: "success",
            message: "Cow updated successfully!",
        };
    } catch (err) {
        res.json({ message: err.message, type: "danger" });
    }
});


router.get('/delete/:cowId', async (req, res) => {
    const id = req.params.cowId;

    try {
        const result = await Cow.findByIdAndDelete(id);

        if (result && result.image) {
            try {
                fs.unlinkSync('./uploads/' + result.image);
            } catch (err) {
                console.log('Error deleting image:', err);
            }
        }

        req.session.message = {
            type: 'info',
            message: 'Cow deleted successfully!',
        };
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.json({ message: err.message, type: 'danger' });
    }
});

module.exports = router;