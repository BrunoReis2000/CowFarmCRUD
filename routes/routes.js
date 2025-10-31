const express = require('express');
const router = express.Router();
router.get('/cows', (req, res) => {
    res.send('List of cows');
});

router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

module.exports = router;