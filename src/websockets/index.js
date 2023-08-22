const WebSocket = require('ws');
const serversConfig = require('../../config/servers.json');

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

            // Reject the connection if the API key is not valid
            const apiKey = info.req.headers['x-api-key'];
            if (!apiKey || !validAPIKeys.includes(apiKey)) {
                console.log(`Rejected connection from unauthorized API key: ${apiKey}`);
                return false;
            }

            // Accept the connection
            console.log(`Accepted connection from ${remoteIP}`);
            return true;
        }
    });

    wss.on('connection', (ws, req) => {
        console.log('New WebSocket connection');
        console.log('Headers:', req.headers['x-api-key']);

        server = serversConfig.keys[req.headers['x-api-key']];
        console.log(`WebSocket connection established with: ${server.name} (${req.socket.remoteAddress})`);

        ws.on('message', (message) => {
            console.log('Received message:', message);

            ws.send('Got it: ' + message);
        });

        ws.send('Hello! Message from server!');
    });
};
