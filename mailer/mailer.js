const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email) => {
    const msg = {
        to: email,
        from: { email: 'noreply@quannotate.com', name: 'QUANNOTATE' },
        subject: 'Please Verify Your Quannotate Account',
        html: '<strong>The verification link should go here</strong>',
    };

    try {
        await sgMail.send(msg);
        return;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    sendVerificationEmail
};

