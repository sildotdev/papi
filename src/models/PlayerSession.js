class PlayerSession {
    spawnTime = 0; // Timestamp for when the player spawned in

    constructor(player, serverIp) {
        this.player = player; // Instance of the Player class
        this.serverIp = serverIp; // IP address of the game server they're connected to
        this.startTime = Date.now(); // Timestamp for when the session started
        this.lastActivityTime = Date.now(); // Timestamp for tracking the last activity
    }
    
    // Update last activity time
    updateActivity() {
        this.lastActivityTime = Date.now();
    }
    
    // Other methods to handle session behavior can be added here
}

module.exports = PlayerSession;