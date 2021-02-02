const path = require('path');
const async = require('async');
const fs = require('fs');
const util = require('util');

const { Analysis, Patient } = require('../database/models/index');
const generateErrorObject = require('../utils/generateErrorObject');
const sortFiles = require('../utils/sortFiles');

const readFile = util.promisify(fs.readFile);

async function getAnalysisSummary(req, res) {
    try {
        const allAnalyses = await Analysis.find().select('name text group subgroups');
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
    const { datasetId, analysisId } = req.query;
    const { id } = req.user;
    // sends bad request error if API call doesn't have datasetId or analysisId 
    if (!datasetId || !analysisId) {
        const missingParameter = !datasetId ? 'datasetId' : 'analysisId';
        res.status(400).json({ error: `Request is missing ${missingParameter} query parameter` });
        return;
    }
    try {
        // chooses patient that have matching dataset_id but no labels that are matching both user and analysis ids
        const patient = await Patient.findOne({
            $or: [{ dataset_id: datasetId, 'labels.user': { '$ne': id } }, { dataset_id: datasetId, 'labels.analysis': { '$ne': analysisId } }] 
        }).select('display_label');
        const patientCount = await Patient.countDocuments({ dataset_id: datasetId });
        if (!patient) {
            res.status(200).json({ message: 'There are no patients left to label in this analysis' });
            return;
        }
        // transforming Mongoose result document into plain object and adds patientCount
        const response = { ...patient.toObject(), patientCount};
        res.status(200).json(response);
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
        const { dataset, windowing, windowingOptions } = await Analysis.findOne({ name: type }).populate('dataset').    select('dataset windowing windowingOptions');
        const { patient } = await Patient.findOne({ _id: patient_id}).select('patient');
        if (!patient) {
            res.status(400).json({ error: 'Unknow patient_id' });
            return;
        }
        // setting directories to read images from
        const dirpath = path.join(__dirname, `../images/${dataset.name}/${patient}`);
        const readFolders = windowing ? windowingOptions.map(el => el.value) : [dirpath];
        // response data
        let errorMessage;
        const fileObject = {};
        const windowingObj = {};
        windowingOptions.forEach(el => {
            const { value, label } = el;
            windowingObj[el.value] = {
                label, value 
            };
        });
        // reading multiple folders
        async.eachSeries(readFolders, function(dir, callback) {
            let readDirectory = windowing ? `${dirpath}/${dir}` : dir;
            // read individual folders (tissue or patient depending if windowing is enabled)
            fs.readdir(readDirectory, function (err, filenames) {
                if (err) errorMessage = err;
                const sortedFiles = sortFiles(filenames);
                const files = sortedFiles.map(function (filename) {
                    const filepath = `${readDirectory}/${filename}`;
                    return readFile(filepath);
                });
                Promise.all(files).then(images => {
                    if (windowing) {
                        const { value, label } = windowingObj[dir];
                        fileObject[dir] = { images, value, label };
                    } else {
                        fileObject.default = { images };
                    } 
                    // runs next folder after all promises have been returned
                    callback();
                }).catch(error => {
                    console.log(error);
                    errorMessage = error;
                });
            });
        }, function (err) {
            if (err) {
                errorMessage = err;
            }
            // sends an error if any errors occured
            if (errorMessage) {
                console.log(errorMessage);
                res.status(500).json({ message: 'Something went wrong' });
                return;
            }
            res.status(200).json({ images: fileObject, windowing });
        });
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

async function registerLabels(req, res) {
    const { analysisId, values, patientId } = req.body;
    if (!analysisId || !values || !patientId ) {
        res.status(400).json({ error: 'Request must contain analysisId, patientId, values' });
        return;
    }
    const { id } = req.user;
    try {
        await Patient.updateOne({ _id: patientId }, {$push: {labels: {user: id, analysis: analysisId, values}}});
        res.status(200).json({ message: 'Labels have been registered' });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: 'Error saving labels' });
    }
}

module.exports = {
    getAnalysisSummary,
    getAnalysisInfo,
    getLabelImages,
    getPatient,
    registerLabels
};