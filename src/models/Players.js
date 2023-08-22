class Players {
    constructor() {
        this.players = [];
    }

    // Function that returns a player object if they exist, and creates a new one if they don't
    getPlayer(steamID64, steamName) {
        if (this.players[steamID64]) {
            return this.players[steamID64];
        }

        if (!steamName) {
            throw new Error(`Attempted to make player object for non-existant SteamID64 ${steamID64} without a steamName!`);
        }

        console.log(`Creating new player object for ${steamName} (${steamID64})`);
        const player = new Player(steamID64, steamName);
        this.players[steamID64] = player;

        return player;
    }
}

module.exports = new Players();