const { readdirSync, writeFile } = require('fs');

// reads content of the folder and generate json of patients data
const createSeedingFile = () => {
    const analyses = readdirSync('./images', { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    const processedData = [];
    analyses.forEach(analysis => {
        const patients = readdirSync(`./images/${analysis}`, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        patients.forEach((patient, i) => {
            const dataObj = {
                _id: patient,
                display_label: `${analysis}-${i + 1}`,
                patient: patient,
                dataset_id: analysis,
                labels: []
            };
            processedData.push(dataObj);
        });
    });
    var json = JSON.stringify(processedData);
    writeFile('./database/data-files/patients.json', json, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Success');
    });
};

createSeedingFile();