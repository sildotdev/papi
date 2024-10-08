const axios = require('axios');

module.exports = {
    createChallenge: function(ws, data) {
        console.log('Creating challenge for player', data.steamId, 'with character', data.characterId);

        axios.post('http://localhost:3000/player/create-challenge', {
            steamId: data.steamId,
            characterId: data.characterId
        }).then((res) => {
            ws.send(JSON.stringify({
                type: 'auth/challengeCreated',
                data: {
                    steamId: data.steamId,
                    characterId: data.characterId,
                    challenge: res.data.authUrl
                }
            }));

            // ws.send("test");
        }).catch((err) => {
            console.error(err);
        });
    }
}