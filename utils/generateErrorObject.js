// creates an error object for API response
const generateErrorObject = (message, property) => ({
    errors: {
        [property]: {
            message
        },
    }, 
    message
});

module.exports = generateErrorObject;