const PlayerSession = require('../../models/PlayerSession');
const Players = require('../../models/Players');

module.exports.onPlayerJoin = (serverSession, data) => {
    console.log("Player joined: ", data)
    player = Players.getPlayer(data.steamID, data.steamName);

    serverSession.onPlayerJoin(player);
}

module.exports.onPlayerLeave = (serverSession, data) => {
    try {
        player = Players.getPlayer(data.steamID);
    
        serverSession.onPlayerLeave(data.steamID, data.reason);
    } catch (e) {
        console.log(e);
    }
}