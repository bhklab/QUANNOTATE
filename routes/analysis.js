const { Analysis, Patient } = require('../database/models/index');
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
        const analysis = await Analysis.findOne({ name: type }).populate('dataset');
        if (!analysis) {
            res.status(400).json({ error: `No analysis documents have been found for ${type}`});
            return;
        }
        res.status(200).json(analysis);
    } catch {
        res.status(500).json({ error: generateErrorObject('Couldn\'t retrieve analysis data', 'generic') });
    }
}

async function getPatient(req, res) {
    const { dataset_id } = req.query;
    if (!dataset_id) {
        res.status(400).json({ error: 'Request is missing "dataset_id" query parameter' });
        return;
    }
    try {
        const patient = await Patient.findOne({ dataset_id }).select('display_label');
        if (!patient) {
            res.status(400).json({ error: `No patient have been found for ${dataset_id}` });
            return;
        }
        res.status(200).json(patient);
    } catch {
        res.status(500).json({ error: generateErrorObject('Couldn\'t retrieve patient data', 'generic') });
    }
}

async function getLabelImages(req, res) {
    const { type } = req.params;
    const { patient_id } = req.query;
    if (!type) {
        res.status(400).json({ error: 'Request must contain analysis type'});
        return;
    }
    if (!patient_id) {
        res.status(400).json({ error: 'Request must contain patient_id parameter' });
        return;
    }
    try {
        // finds dataset value of the requested analysis
        const { dataset } = await Analysis.findOne({ name: type }).populate('dataset').select('dataset');
        const { patient } = await Patient.findOne({ _id: patient_id}).select('patient');
        if (!patient) {
            res.status(400).json({ error: 'Unknow patient_id' });
            return;
        }
        const dirpath = path.join(__dirname, `../images/${dataset.name}/${patient}`);
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
                res.status(400).json({ message: 'Error retrieving CT scans' });
            });
        });
    } catch {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

function registerLabels(req, res) {
    console.log(req);
    res.status(200).json({ message: 'Labels have been registered'});
}

module.exports = {
    getAnalysisSummary,
    getAnalysisInfo,
    getLabelImages,
    getPatient,
    registerLabels
};