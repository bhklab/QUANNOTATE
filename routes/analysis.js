const Analysis = require('../database/models/analysis');
const generateErrorObject = require('../utils/generateErrorObject');

function getImages(req, res) {
    res.status(200).json({ message: 'Success' });
}

async function getAnalysisSummary(req, res) {
    try {
        const allAnalyses = await Analysis.find().select('name text');
        res.status(200).json(allAnalyses);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: generateErrorObject('Couldn\'t retrieve analysis data', 'generic') });
    }
}

module.exports = {
    getImages,
    getAnalysisSummary
};