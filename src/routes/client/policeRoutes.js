const express = require('express');
const router = express.Router();
const defineArrestRecord = require('../../models/ArrestRecord');

router.get('/', async (req, res) => {
    res.status(200).json({
        "realm": "police"
    });
});

router.get('/arrests', async (req, res) => {
    const ArrestRecord = await defineArrestRecord();

    try {
        const arrestRecords = await ArrestRecord.findAll();
        res.status(200).json(arrestRecords);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get arrest records' });
    }
});

module.exports = router;