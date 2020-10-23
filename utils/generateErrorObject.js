// creates an error object ofr API response
const generateErrorObject = (message) => ({
    errors: {
        email: {
            message
        },
    }, 
    message
});

module.exports = generateErrorObject;