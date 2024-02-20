const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    // @TODO Check if client has valid session token
    next();
});

router.get('/', async (req, res) => {
    res.status(200).json({
        "realm": "client",
        "version": package.version
    });
});

module.exports = router;