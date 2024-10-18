const express = require('express');
const package = require('../../package.json');
const ipfilter = require('express-ipfilter').IpFilter;
const serversConfig = require('../../config/servers.json');
const ServerState = require('../models/ServerState');
const jwt = require('jsonwebtoken');

const router = express.Router();

const whitelistedIPs = Object.keys(serversConfig.ips);

// router.use((req, res, next) => {
//     // Reject the connection if the IP is not whitelisted
//     const remoteIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    
//     console.log( remoteIP )

//     if (!whitelistedIPs.includes(remoteIP)) {
//         console.log(`Rejected connection from unauthorized IP: ${remoteIP}`);
//         res.status(401).send('Unauthorized IP');
//         return;
//     }

//     next();
// });

// router.use((req, res, next) => {
//     if (req.headers['x-session-token'] == undefined) {
//         res.status(401).send('Missing session token');
//         return;
//     }

//     console.log("All servers: ", ServerState.getServers());

//     const serverSession = ServerState.getServer(req.headers['x-session-token']);

//     if (!serverSession) {
//         res.status(401).send('Invalid session token');
//         return;
//     }

//     req.serverInfo = serverSession;

//     next();
// });

// router.use((req, res, next) => {
    
// });

const policeRoutes = require('./server/policeRoutes');
router.use('/police', policeRoutes);

router.get('/', async (req, res) => {
    res.status(200).json({
        "realm": "server",
        "version": package.version
    });
});

module.exports = router;