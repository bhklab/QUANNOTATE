function getImages(req, res) {
    res.status(200).json({ message: 'Success' });
}

function getAnalysisSummary(req, res) {
    res.status(200).json({ message: 'Success'});
}

module.exports = {
    getImages,
    getAnalysisSummary
};