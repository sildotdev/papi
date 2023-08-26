const WebSocket = require('ws');
const ServerState = require('../models/ServerState');

const serversConfig = require('../../config/servers.json');

// Handlers
const gameServerHandler = require('./handlers/gameServerHandler');

// Extract the whitelisted IPs
const whitelistedIPs = Object.keys(serversConfig.ips);
const validAPIKeys = Object.keys(serversConfig.keys);

// Export a function to initialize the WebSocket server
module.exports = function (server) {
    const wss = new WebSocket.Server({
        server,
        verifyClient: (info) => {
            // Reject the connection if the IP is not whitelisted
            const remoteIP = info.req.socket.remoteAddress;
            if (!whitelistedIPs.includes(remoteIP)) {
                console.log(`Rejected connection from unauthorized IP: ${remoteIP}`);
                return false;
            }

            const sessionToken = info.req.headers['x-session-token'];
            if (sessionToken) {
                const serverSession = ServerState.getServer(sessionToken);

                if (serverSession) {
                    info.req.serverInfo = serverSession;
                    return true;
                } else {
                    console.log(`Rejected connection from invalid session token: ${sessionToken}`);
                    return false;
                }
            }

            const apiKey = info.req.headers['x-api-key'];

            // Reject the connection if the API key is missing
            if (!apiKey) {
                console.log(`Rejected connection from missing API key.`);
                return false;
            }

            // Reject the connection if the API key is not valid
            if (!validAPIKeys.includes(apiKey)) {
                console.log(`Rejected connection from unauthorized API key: ${apiKey}`);
                return false;
            }

            // Accept the connection
            console.log(`Accepted connection from ${remoteIP}`);

            info.req.serverInfo = serversConfig.keys[apiKey];
            info.req.serverInfo.active = false;

            return true;
        }
    });

    // Initialize the handlers
    gameServerHandler(wss);
};
