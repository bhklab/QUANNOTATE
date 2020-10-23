// creates an error object ofr API response
const generateErrorObject = (message, property) => ({
    errors: {
        [property]: {
            message
        },
    }, 
    message
});

module.exports = generateErrorObject;