const GameServer = require('./GameServer');

class ServerState {
    constructor() {
        this.servers = {};
    }

    addServer(ip, name, key, production) {
        this.servers[ip] = new GameServer(ip, name, key, production);
    }

    getServer(ip) {
        return this.servers[ip];
    }
}

module.exports = new ServerState(); // Singleton instance
