// basic express app
const express = require('express');
const app = express();

// express route
const ui = require('./routes/ui');
app.use('/ui', ui);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Add public directory for static files
app.use('/public', express.static('public'))

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});