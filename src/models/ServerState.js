const GameServerSession = require('./GameServerSession');

class ServerState {
    constructor() {
        this.sessions = {};
    }

    addServer(ip, name, production, whitelist) {
        let session = new GameServerSession(ip, name, production, whitelist);
        
        this.sessions[session.sessionToken] = session;

        return session;
    }

    getServer(sessionToken) {
        return this.sessions[sessionToken];
    }

    getServers() {
        return this.sessions;
    }

    removeServer(sessionToken) {
        delete this.sessions[sessionToken];
    }
}

module.exports = new ServerState(); // Singleton instance
