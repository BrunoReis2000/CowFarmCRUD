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
            birthDate: req.body.birthDate,
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
            birthDate: req.body.birthDate,
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

// Excel to JSON converter page
router.get('/import', (req, res) => {
    res.render('xlsxToJson');
});


router.post('/updateCow/:cowId', async (req, res) => {
    const id = req.params.cowId;

    try {
        await Cow.findByIdAndUpdate(id, {
            tag: req.body.tag,
            checkDigit: req.body.checkDigit,
            race: req.body.race,
            birthDate: req.body.birthDate,
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
            birthDate: req.body.birthDate,
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

// Bulk insert cows from JSON
router.post('/bulkAddCows', async (req, res) => {
    console.log('POST /bulkAddCows called');
    console.log('Request body:', req.body);
    
    try {
        const cowsData = req.body.cows;
        console.log('Cows data:', cowsData);
        
        if (!Array.isArray(cowsData)) {
            console.log('Invalid data format');
            return res.status(400).json({ 
                message: 'Invalid data format. Expected array of cows.',
                type: 'danger' 
            });
        }

        // Insert all cows
        const result = await Cow.insertMany(cowsData, { ordered: false });
        console.log(`Successfully inserted ${result.length} cows`);
        
        res.json({
            message: `${result.length} vacas adicionadas com sucesso!`,
            type: 'success',
            inserted: result.length
        });
        
    } catch (err) {
        console.error('Error in bulkAddCows:', err);
        // Handle duplicate key errors gracefully
        if (err.code === 11000) {
            res.status(400).json({ 
                message: 'Algumas vacas já existem na base de dados (duplicatas ignoradas).',
                type: 'warning'
            });
        } else {
            res.status(500).json({ 
                message: err.message, 
                type: 'danger' 
            });
        }
    }
});

module.exports = router;