const PlayerSession = require('../../models/PlayerSession');
const Players = require('../../models/Players');

module.exports.onPlayerJoin = (serverSession, data) => {
    player = Players.getPlayer(data.steamID64, data.steamName);

    serverSession.onPlayerJoin(player);
}

module.exports.onPlayerLeave = (serverSession, data) => {
    try {
        player = Players.getPlayer(data.steamID64);
    
        serverSession.onPlayerLeave(data.steamID64);
    } catch (e) {
        console.log(e);
    }
}