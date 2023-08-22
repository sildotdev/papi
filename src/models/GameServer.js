class GameServer {
    constructor(ip, name, key, production) {
        this.ip = ip;
        this.name = name;
        this.key = key;
        this.production = production;
        this.players = [];
        this.uptime = 0;
        this.lastHeartbeat = Date.now();
    }
  
    updateHeartbeat() {
        this.lastHeartbeat = Date.now();
    }
  
    addPlayer(player) {
        this.players.push(player);
    }
  
    removePlayer(player) {
        this.players = this.players.filter(p => p !== player);
    }
}

module.exports = GameServer;