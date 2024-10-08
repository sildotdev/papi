const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use((req, res, next) => {
    // Check bearer token
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

    if (!req.cookies.auth_token) {
        // Save the original URL
        const originalUrl = req.originalUrl;
        
        // Redirect to SSO server with the original URL as a query parameter
        return res.redirect(`${process.env.AUTH_URL}/webclient/login?returnUrl=${process.env.BASE_URL + originalUrl}`);
    }

    const token = req.cookies.auth_token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        
        // Save the original URL
        const originalUrl = req.originalUrl;
        
        // Redirect to SSO server with the original URL as a query parameter
        res.redirect(`${process.env.AUTH_URL}/webclient/login?returnUrl=${process.env.BASE_URL + originalUrl}`);
    }
});

const policeRoutes = require('./client/policeRoutes');
router.use('/police', policeRoutes);

module.exports = router;