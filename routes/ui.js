const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const cacheDirectory = path.join(__dirname, '..', 'cache');

const disableCache = true;

// Create cache directory if it doesn't exist
if (!fs.existsSync(cacheDirectory)) {
    fs.mkdirSync(cacheDirectory);

    // Create subdirectories
    // fs.mkdirSync(path.join(cacheDirectory, 'plymenu'));
}

async function renderHTMLToPNG(fileContent, width, height, outputPath) {
    const browser = await puppeteer.launch({ headless: true, args: ['--disable-web-security'] });
    const page = await browser.newPage();

    // console.log(`Rendering ${filePath} to ${outputPath} at ${width}x${height}`);

    console.log(`Rendering to ${outputPath} at ${width}x${height}`);

    await page.setViewport({ width, height });
    page.on('console', consoleObj => console.log(consoleObj.text()));
    await page.evaluate(() => {
        window.addEventListener('error', (event) => {
            console.log(`Error loading ${event.target.src}`);
        }, true);
    });
    await page.setContent(fileContent, { waitUntil: 'networkidle0' });


    // await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

    await page.screenshot({ path: outputPath });

    console.log(`Render complete.`);

    await browser.close();
}

const allowedResolutions = [
    { width: 1280, height: 720 },
    { width: 1600, height: 900 },
    { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
    { width: 3840, height: 2160 },
    { width: 2560, height: 1080 },
    { width: 3440, height: 1440 },
    { width: 5120, height: 2160 }
];

const allowedSteamIDs = [
    '76561198072551027', // sil
    '76561197997304089', // Knight
    '0',

    // Playtesters
    '76561198139507705', // ZakisMal
    '76561198030695593', // tone
    '76561199117143435', // puvz
    '76561198159973012', // Wolv
    '76561198352665638', // Sudzy
    '76561198241491232', // Du$ty
]

router.get('/resolutions', async (req, res) => {
    res.json(allowedResolutions);
});

router.get('/:screen/:view/:width/:height', async (req, res) => {
    // Check headers for the Steam ID
    if (req.headers['steamid'] == undefined) {
        res.status(401).send('Missing Steam ID');
        return;
    }

    // Check headers for API key
    if (req.headers['apikey'] == undefined) {
        res.status(401).send('Missing API key');
        return;
    }

    // Check if the API key is valid
    // @TODO: Don't do API key like this (also)
    // @TODO: Change API key after playtest
    if (req.headers['apikey'] != 'uE2YS7gaH6e2hmr8zU0433iB4KTacUWh') {
        res.status(401).send('Invalid API key');
        return;
    }

    // Check if the Steam ID is allowed
    if (!allowedSteamIDs.includes(req.headers['steamid'])) {
        res.status(403).send('Not allowed');
        return;
    }

    // Check if steam name is set
    if (req.headers['steamname'] == undefined) {
        res.status(401).send('Missing Steam name');
        return;
    }

    const { screen, view, width, height } = req.params;
    const cacheKey = `${width}_${height}.png`;
    const cachePath = path.join(cacheDirectory, view, cacheKey);

    const filePath = path.join(__dirname, `../views/${screen}/${view}.ejs`);

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

    // Create cache directory if it doesn't exist
    if (!fs.existsSync(path.join(cacheDirectory, view))) {
        fs.mkdirSync(path.join(cacheDirectory, view));
    }

    // Check if the image exists in the cache
    if (!disableCache && fs.existsSync(cachePath)) {
        // Serve the cached image
        res.sendFile(cachePath);
    } else {
        try {
            const outputPath = cachePath;

            ejs.renderFile(filePath, {
                steam: {
                    id: req.headers['steamid'],
                    name: req.headers['steamname'],
                }
            }, async (err, html) => {

                if (err) {
                    console.error('Error rendering EJS:', err);
                    res.status(500).send('Error rendering EJS');
                    return;
                }

                // Render the local HTML file to PNG
                // convert the width and height to integers
                await renderHTMLToPNG(html, parseInt(width), parseInt(height), outputPath);
    
                // Serve the generated image
                res.sendFile(outputPath);
            });
        } catch (error) {
            console.error('Error rendering page:', error);
            res.status(500).send('Error rendering page');
        }
    }
});

module.exports = router;
