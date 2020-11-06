const Analysis = require('../database/models/analysis');
const generateErrorObject = require('../utils/generateErrorObject');
const fs = require('fs');

function getLabelImages(req, res) {
    const { type } = req.params;
    if (!type) {
        res.status(400).json({ error: 'Request must contain analysis type'});
    }
    console.log('request params', req.params);
    
    const fileNames = fs.readdirSync(`/images/${type}`, ['**.png']);
    res.status(200).json({ message: 'Success' });

    // const data = {};

    // fileNames.forEach(function (filename) {
    //     filepath = path.join(__dirname, '../../uploads/output') + '/' + filename;

    //     fs.readFile(path.join(__dirname, '../../uploads/output') + '/' + filename, function (err, content) {
    //         if (!err) {
    //             console.log(content);
    //         }
    //     });
    // });

    //res.sendFile(path.join(__dirname,'../../uploads/output/', fileNames[0]));

    // response.data = fileNames;
    // res.json(response);
}

async function getAnalysisSummary(req, res) {
    try {
        console.log('Here');
        const allAnalyses = await Analysis.find().select('name text');
        console.log(allAnalyses);
        res.status(200).json(allAnalyses);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: generateErrorObject('Couldn\'t retrieve analysis data', 'generic') });
    }
}

function registerLabels(req, res) {
    res.status(200).json({ message: 'Labels have been registered'});
}

module.exports = {
    getLabelImages,
    getAnalysisSummary,
    registerLabels
};