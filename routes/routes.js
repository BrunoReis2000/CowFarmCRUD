const express = require('express');
const router = express.Router();
const Cow = require('../models/cows');
const Sheep = require('../models/sheeps');
const multer = require('multer');
const fs = require('fs');
const { type } = require('os');




router.post('/add', async (req, res) => {
    try {
        const cow = new Cow({
            
            tag: req.body.tag,
            checkDigit: req.body.checkDigit,
            race: req.body.race,
            breedCount: req.body.breedCount,
            lastTimeCalved: req.body.lastTimeCalved,
            lastTimeSanitized: req.body.lastTimeSanitized,
            comments: req.body.comments
        });

        await cow.save(); // save() returns a Promise now
        req.session.message = { type: 'success', message: 'Vaca adicionada com sucesso!' };
        res.redirect('/');
        console.log(req.session.message);
        
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

router.post('/addSheep', async (req, res) => {
    console.log('Add sheep body:', req.body);
    try {
        const sheep = new Sheep({
            
            tag: req.body.tag,
            checkDigit: req.body.checkDigit,
            breedCount: req.body.breedCount,
            lastTimeCalved: req.body.lastTimeCalved,
            dateOfLastSanitation: req.body.dateOfLastSanitation,
            comments: req.body.comments
        });

        await sheep.save(); // save() returns a Promise now
        req.session.message = { type: 'success', message: 'Ovelha adicionada com sucesso!' };
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
        const sheeps = await Sheep.find().exec(); // promise-based
        const message = req.session ? req.session.message : undefined;
        if (req.session) delete req.session.message; // consume flash message
        res.render('index', {
            cows: cows,
            sheeps: sheeps,
            title: 'Sistema de Gestão de Animais',
            message: message
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/updateCow/:cowId', async (req, res) => {
    const id = req.params.cowId;

    try {
        await Cow.findByIdAndUpdate(id, {
            tag: req.body.tag,
            checkDigit: req.body.checkDigit,
            race: req.body.race,
            breedCount: req.body.breedCount,
            lastTimeCalved: req.body.lastTimeCalved,
            lastTimeSanitized: req.body.lastTimeSanitized,
            comments: req.body.comments
        });

        req.session.message = {
            type: "success",
            message: "Vaca atualizada com sucesso!",
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: "danger" });
    }
});

router.post('/updateSheep/:sheepId', async (req, res) => {
    const id = req.params.sheepId;

    try {
        await Sheep.findByIdAndUpdate(id, {

            tag: req.body.tag,
            checkDigit: req.body.checkDigit,
            breedCount: req.body.breedCount,
            lastTimeCalved: req.body.lastTimeCalved,
            dateOfLastSanitation: req.body.dateOfLastSanitation,
            comments: req.body.comments
        });

        req.session.message = {
            type: "success",
            message: "Ovelha atualizada com sucesso!",
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: "danger" });
    }
});


router.get('/deleteCow/:cowId', async (req, res) => {
    const id = req.params.cowId;

    try {
        const result = await Cow.findByIdAndDelete(id);
        req.session.message = {
            type: 'info',
            message: 'Vaca eliminada com sucesso!',
        };
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.json({ message: err.message, type: 'danger' });
    }
});

router.get('/deleteSheep/:sheepId', async (req, res) => {
    const id = req.params.sheepId;

    try {
        const result = await Sheep.findByIdAndDelete(id);
        req.session.message = {
            type: 'info',
            message: 'Ovelha eliminada com sucesso!',
        };
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.json({ message: err.message, type: 'danger' });
    }
});

module.exports = router;