const Player = require('./Player');

class Players {
    constructor() {
        this.players = [];
    }

    // Function that returns a player object if they exist, and creates a new one if they don't
    getPlayer(steamID, steamName) {
        if (this.players[steamID]) {
            return this.players[steamID];
        }

        if (!steamName) {
            throw new Error(`Attempted to make player object for non-existant SteamID ${steamID} without a steamName!`);
        }

        console.log(`Creating new player object for ${steamName} (${steamID})`);
        const player = new Player(steamID, steamName);
        this.players[steamID] = player;

        return player;
    }
}

module.exports = new Players();