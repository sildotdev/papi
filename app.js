// modules
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const package = require('./package.json');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

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
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('combined')); // HTTP request logger
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use((req, res, next) => {
//     res.setHeader('X-Content-Type-Options', 'nosniff'); // Or remove this line to not set 'nosniff'
//     res.setHeader('Content-Type', 'your/mime-type'); // Replace with your MIME type
//     next();
// });



// serve static files
app.use('/public', express.static('public'))

// routes
const ui = require('./routes/ui');
app.use('/ui', ui);

app.get('/', (req, res) => {
    res.send('P-API v' + package.version);
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// server start
app.listen(PORT, () => {
    console.log(`P-API v${package.version} started on port ${PORT}`);
});