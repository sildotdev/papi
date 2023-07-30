// modules
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");

// server configuration
const PORT = process.env.PORT || 3000;
const app = express();

// Apply rate limiter to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(helmet()); // helps secure your apps by setting various HTTP headers
app.use(morgan('combined')); // HTTP request logger
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve static files
app.use('/public', express.static('public'))

// routes
const ui = require('./routes/ui');
app.use('/ui', ui);

app.get('/', (req, res) => {
    res.send('P-API v0.0');
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
