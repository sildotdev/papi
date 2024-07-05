const express = require('express');
const router = express.Router();

const ArrestRecord = require('../../models/ArrestRecord');

router.get('/', async (req, res) => {
    res.status(200).json({
        "realm": "police"
    });
});

router.post('/arrest', async (req, res) => {
    
});

router.post('/warrant', async (req, res) => {

});

module.exports = router;