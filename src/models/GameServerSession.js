const { v4: uuidv4 } = require('uuid');

const Players = require('./Players');

class GameServerSession {
    constructor(ip, name, production) {
        this.ip = ip;
        this.name = name;
        this.production = production;
        this.active = true;

        this.players = [];
        this.playerSessions = [];
        this.lastHeartbeat = Date.now();

        this.sessionToken = uuidv4(); // Unique session token
    }

    // Heartbeat management

    updateHeartbeat() {
        this.lastHeartbeat = Date.now();
    }

    // Player management

    onPlayerJoin(player) {
        playerSession = new PlayerSession(
            this,
            player,
        );

        this.playerSessions.push(playerSession);
        this.players.push(player);
    }

    onPlayerLeave(player) {
        this.players = this.players.filter(p => p !== player);
    }
}

module.exports = GameServerSession;
