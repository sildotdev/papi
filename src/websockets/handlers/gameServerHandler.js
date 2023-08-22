const ServerState = require('../../models/ServerState');

const playerSessionHandler = require('./playerSessionHandler');

module.exports = function (wss) {
    wss.on('connection', (ws, req) => {
        serverSession = ServerState.addServer(
            req.socket.remoteAddress,
            req.serverInfo.name,
            req.serverInfo.production
        );

        ws.send(JSON.stringify({
            type: 'sessionToken',
            sessionToken: serverSession.sessionToken
        }));

        ws.send(JSON.stringify({
            type: 'serverInfo',
            serverInfo: {
                name: serverSession.name,
                production: serverSession.production
            }
        }));

        ws.on('message', (message) => {
            console.log("Received: ", message);

            let data;
            try {
                data = JSON.parse(message);

                if (!data) {
                    throw new Error("Invalid JSON");
                }

                if (!data.type) {
                    throw new Error("Missing type");
                }
            } catch (e) {
                console.log(e);
                return;
            }

            switch (data.type) {
                case 'heartbeat':
                    console.log("Received heartbeat from server: ", serverSession.name);
                    break;
                case 'playerJoin':
                    playerSessionHandler.onPlayerJoin(serverSession, data);
                    break;
                case 'playerLeave':
                    playerSessionHandler.onPlayerLeave(serverSession, data);
                    break;
                case 'playerSpawn':
                    // placeholder
                    break;
            }
        });

        ws.on('close', () => {
            ServerState.removeServer(serverSession.sessionToken);  
        })
    });
};