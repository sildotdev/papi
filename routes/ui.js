const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const cacheDirectory = path.join(__dirname, '..', 'cache');

const disableCache = true;

// Create cache directory if it doesn't exist
if (!fs.existsSync(cacheDirectory)) {
    fs.mkdirSync(cacheDirectory);

    // Create subdirectories
    fs.mkdirSync(path.join(cacheDirectory, 'plymenu'));
}

async function renderHTMLToPNG(filePath, width, height, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log(`Rendering ${filePath} to ${outputPath} at ${width}x${height}`);

    await page.setViewport({ width, height });
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

    await page.screenshot({ path: outputPath });

    await browser.close();
}

allowedResolutions = [
    { width: 1280, height: 720 },
    { width: 1600, height: 900 },
    { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
    { width: 3840, height: 2160 },
    { width: 2560, height: 1080 },
    { width: 3440, height: 1440 },
    { width: 5120, height: 2160 }
];

router.get('/:screen/:view/:width/:height', async (req, res) => {
    const { screen, view, width, height } = req.params;
    const cacheKey = `${width}_${height}.png`;
    const cachePath = path.join(cacheDirectory, view, cacheKey);

    const filePath = path.join(__dirname, `../views/${screen}/${view}.html`);

    if (!fs.existsSync(path.join(__dirname, `../views/${screen}`))) {
        res.status(404).send('Screen not found');
        return;
    }

    // Check if the bg view exists
    if (!fs.existsSync(filePath)) {
        res.status(404).send('View not found');
        return;
    }

    // Check if the resolution is allowed
    if (!allowedResolutions.some(r => r.width == width && r.height == height)) {
        res.status(400).send('Invalid resolution');
        return;
    }

    // Check if the image exists in the cache
    if (!disableCache && fs.existsSync(cachePath)) {
        // Serve the cached image
        res.sendFile(cachePath);
    } else {
        try {
            const outputPath = cachePath;

            // Render the local HTML file to PNG
            // convert the width and height to integers
            await renderHTMLToPNG(filePath, parseInt(width), parseInt(height), outputPath);

            // Serve the generated image
            res.sendFile(outputPath);
        } catch (error) {
            console.error('Error rendering page:', error);
            res.status(500).send('Error rendering page');
        }
    }
});

module.exports = router;
