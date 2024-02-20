const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    // @TODO Check if client has valid session token
    next();
});

router.use('/police', require('./shared/policeRoutes'));
router.use('/ui', require('./client/uiRoutes'));

router.get('/', async (req, res) => {
    res.status(200).json({
        "realm": "client",
        "version": package.version
    });
});

module.exports = router;