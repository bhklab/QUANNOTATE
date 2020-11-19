const Analysis = require('../database/models/analysis');
const generateErrorObject = require('../utils/generateErrorObject');
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function getAnalysisSummary(req, res) {
    try {
        const allAnalyses = await Analysis.find().select('name text');
        res.status(200).json(allAnalyses);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: generateErrorObject('Couldn\'t retrieve analysis data', 'generic') });
    }
}

async function getAnalysisInfo(req, res) {
    const { type } = req.params;
    if (!type) {
        res.status(400).json({ error: 'Request must contain analysis type' });
        return;
    }
    try {
        const allAnalyses = await Analysis.find({ name: type });
        if (allAnalyses.length === 0) {
            res.status(400).json({ error: `No analysis documents have been found for ${type}`});
            return;
        }
        res.status(200).json(allAnalyses);
    } catch {
        res.status(500).json({ error: generateErrorObject('Couldn\'t retrieve analysis data', 'generic') });
    }
}

async function getLabelImages(req, res) {
    const { type } = req.params;
    if (!type) {
        res.status(400).json({ error: 'Request must contain analysis type'});
        return;
    }
    try {
        // finds dataset value of the requested analysis
        const { dataset } = await Analysis.findOne({ name: type }).select('dataset');
        const dirpath = path.join(__dirname, `../images/${dataset}`);
        // reads all files in the folder
        fs.readdir(dirpath, function (err, filenames) {
            if (err) {
                console.log('error ', err);
                res.status(500).json({ error: generateErrorObject(`Analysis type ${type} doesn't exist`, 'generic') });
                return;
            }
            // Sorts filename strings numerically instead of alphabetically
            // for numerical filenames to keep consistent order of images
            filenames.sort((file1, file2) => {
                const filename1 = file1.split('.').shift();
                const filename2 = file2.split('.').shift();
                if (!isNaN(filename1) && !isNaN(filename2)) {
                    return parseInt(filename1, 10) - parseInt(filename2, 10);
                }
                return filename1.localeCompare(filename2);
            });
            // creates an array of promises
            const files = filenames.map(function (filename) {
                const filepath = `${dirpath}/${filename}`;
                return readFile(filepath);
            });
            // sends reponse once all images has been read
            Promise.all(files).then(images => {
                res.status(200).send(images);
            }).catch(error => {
                console.log(error);
                res.status(400).json({ message: 'Error retieiving CT scans' });
            });
        });
    } catch {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

function registerLabels(req, res) {
    res.status(200).json({ message: 'Labels have been registered'});
}

module.exports = {
    getAnalysisSummary,
    getAnalysisInfo,
    getLabelImages,
    registerLabels
};