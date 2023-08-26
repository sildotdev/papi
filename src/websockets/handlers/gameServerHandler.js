const ServerState = require('../../models/ServerState');

const playerSessionHandler = require('./playerSessionHandler');

module.exports = function (wss) {
    wss.on('connection', (ws, req) => {
        serverSession = ServerState.addServer(
            req.socket.remoteAddress,
            req.serverInfo.name,
            req.serverInfo.production,
            req.serverInfo.whitelist
        );

        ws.send(JSON.stringify({
            type: 'auth',
            sessionToken: serverSession.sessionToken,
            serverInfo: {
                name: serverSession.name,
                production: serverSession.production,
                whitelist: serverSession.whitelist
            }
        }));

        ws.on('message', (message) => {
            console.log("Received: ", message);

            let contents;
            try {
                contents = JSON.parse(message);

                if (!contents) {
                    throw new Error("Invalid JSON");
                }

                if (!contents.type) {
                    throw new Error("Missing type");
                }
            } catch (e) {
                console.log(e);
                return;
            }

            switch (contents.type) {
                case 'heartbeat':
                    console.log("Received heartbeat from server: ", serverSession.name);
                    break;
                case 'player/join':
                    playerSessionHandler.onPlayerJoin(serverSession, contents.data);
                    break;
                case 'player/leave':
                    playerSessionHandler.onPlayerLeave(serverSession, contents.data);
                    break;
                case 'player/spawn':
                    // placeholder
                    break;
            }
        });

        ws.on('close', () => {
            console.log("Server disconnected: ", serverSession.name, " (", serverSession.sessionToken, ")");
            ServerState.removeServer(serverSession.sessionToken);
        })
    });
};