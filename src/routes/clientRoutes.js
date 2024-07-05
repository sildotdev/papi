const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = "your-jwt-secret-key"

router.use((req, res, next) => {
    // check if auth_token exists
    // avoid TypeError: Cannot read properties of undefined (reading 'auth_token')
    if (!req.cookies.auth_token) {
        res.status(401).json({ error: 'No token provided' });
    }
    let token = req.cookies.auth_token;


    // const token = req.cookies.auth_token;
  
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
});

const policeRoutes = require('./client/policeRoutes');
router.use('/police', policeRoutes);

module.exports = router;