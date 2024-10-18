const express = require('express');
const router = express.Router();

const defineArrestRecord = require('../../models/ArrestRecord');

router.get('/', async (req, res) => {
    res.status(200).json({
        "realm": "police"
    });
});

router.post('/arrest', async (req, res) => {
    console.log("POST /arrest");

    const ArrestRecord = await defineArrestRecord();
    
    console.log("REQ BODY / REQ JSON:")
    console.log(req.body);
    // parse json body
    console.log(req.json);
    
    
    let { suspectID, suspectName, officerID, officerName, time, reason } = req.body;
    if (!suspectID || !suspectName || !officerID || !officerName || !time || !reason) {
        res.status(400).json({ error: 'Missing required information' });
        return;
    }

    try {
        const arrestRecord = await ArrestRecord.create({
            arrestTime: new Date(),
            suspectID: suspectID,
            suspectName: suspectName,
            officerID: officerID,
            officerName: officerName,
            length: time,
            reason: reason
        });

        res.status(201).json(arrestRecord);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create arrest record' });
    }
});

router.post('/warrant', async (req, res) => {

});

module.exports = router;