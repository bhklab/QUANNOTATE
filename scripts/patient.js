const { readdirSync, writeFile } = require('fs');

// reads content of the folder and generate json of patients data
const createSeedingFile = () => {
    const data = readdirSync('./', { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    const processedData = data.map(el => ({
        _id: el,
        patient_id: el,
        dataset_id: 'neck',
        labels: []
    }));
    var json = JSON.stringify(processedData);
    writeFile('./patients.json', json, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Success');
    });
};

createSeedingFile();