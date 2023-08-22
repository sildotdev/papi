const GameServerSession = require('./GameServerSession');

class ServerState {
    constructor() {
        this.sessions = {};
    }

    addServer(ip, name, key, production) {
        let session = new GameServerSession(ip, name, key, production);
        
        this.sessions[session.sessionToken] = session;

        return session;
    }

    getServer(sessionToken) {
        return this.servers[sessionToken];
    }

    removeServer(sessionToken) {
        delete this.sessions[sessionToken];
    }
}

module.exports = new ServerState(); // Singleton instance
