const { v4: uuidv4 } = require('uuid');

const Players = require('./Players');
const PlayerSession = require('./PlayerSession');

class GameServerSession {
    constructor(ip, name, production, whitelist) {
        this.ip = ip;
        this.name = name;
        this.production = production;
        this.whitelist = whitelist || false;
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
        let playerSession = new PlayerSession(
            this,
            player,
        );

        this.playerSessions.push(playerSession);
        this.players.push(player);
    }

    onPlayerLeave(player) {
        this.players = this.players.filter(p => p !== player);

        let playerSession = this.playerSessions.find(ps => ps.player === player);
        if (playerSession) {
            playerSession.onPlayerLeave();
            this.playerSessions = this.playerSessions.filter(ps => ps !== playerSession);
        }
    }
}

module.exports = GameServerSession;
