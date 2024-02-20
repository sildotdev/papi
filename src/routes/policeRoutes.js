const express = require('express');
const router = express.Router();

router.get('/arrests', (req, res) => {
    // @TODO: Recent arrests
});

router.get('/tickets', (req, res) => {
    // @TODO: Recent tickets
});

router.get('/warrants', (req, res) => {
    // @TODO: Recent warrants
});

router.get('/search', (req, res) => {
    // @TODO: Search characters by name
});

router.get('/lookup/:id', (req, res) => {
    // @TODO: Return basic character information
});

router.get('/lookup/:id/tickets', (req, res) => {
    // @TODO: Return character ticket history
});

router.get('/lookup/:id/arrests', (req, res) => {
    // @TODO: Return character arrest history
});

router.get('/lookup/:id/warrants', (req, res) => {
    // @TODO: Return character warrant history
});

router.get('/lookup/:id/vehicles', (req, res) => {
    // @TODO: Return character vehicles
});

module.exports = router;