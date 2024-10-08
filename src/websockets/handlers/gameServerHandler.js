const ServerState = require('../../models/ServerState');

const playerSessionHandler = require('./playerSessionHandler');
const gameClientAuthHandler = require('./gameClientAuthHandler');

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
                    console.log("Player joined: ", contents.data);
                    playerSessionHandler.onPlayerJoin(serverSession, contents.data);
                    break;
                case 'player/leave':
                    console.log("Player left: ", contents.data);
                    playerSessionHandler.onPlayerLeave(serverSession, contents.data);
                    break;
                case 'player/spawn':
                    console.log("Player spawned: ", contents.data);
                    // placeholder
                    break;
                case 'auth/createChallenge':
                    console.log("Received auth challenge request: ", contents.data);
                    gameClientAuthHandler.createChallenge(ws, contents.data);
                    break;
            }
        });

        ws.on('close', () => {
            console.log("Server disconnected: ", serverSession.name, " (", serverSession.sessionToken, ")");
            ServerState.removeServer(serverSession.sessionToken);
        })
    });
};