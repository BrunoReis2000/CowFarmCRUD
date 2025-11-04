const express = require('express');
const router = express.Router();
const Cow = require('../models/cows');
const multer = require('multer');

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


module.exports = router;