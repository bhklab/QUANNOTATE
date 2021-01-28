// Sorts filename strings numerically instead of alphabetically
// for numerical filenames to keep consistent order of images
const sortFiles = (filenames) => {
    // creates new array of file names
    const files = [...filenames];
    files.sort((file1, file2) => {
        const filename1 = file1.split('.').shift();
        const filename2 = file2.split('.').shift();
        if (!isNaN(filename1) && !isNaN(filename2)) {
            return parseInt(filename1, 10) - parseInt(filename2, 10);
        }
        return filename1.localeCompare(filename2);
    });
    return files;
};
        
module.exports = sortFiles;