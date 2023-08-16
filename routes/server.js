const express = require('express');
const package = require('../package.json');
const router = express.Router();
const config = require('../config.json');
const ipfilter = require('express-ipfilter').IpFilter;

router.use(ipfilter(config["whitelisted-server-ips"], { mode: 'allow' }));

router.get('/', (req, res) => {
    res.json({
        "version": package.version
    });
});

module.exports = router;