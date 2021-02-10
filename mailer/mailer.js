const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, url) => {
    
    const html = `
        <div style="width: 100%; height: 100%; background-color: #212121;">
            <div style="max-width: 450px; margin: 0 auto; padding: 15px;">
                <p style="font-size: 24px; color: #f1f8fc; text-align: center;">
                    Thank you for creating Quannotate account
                </p>
                <p style="font-size: 15px; color: #f1f8fc;">
                    Please verify your account by clicking this 
                    <a style="color: #84c3ff;" href="http://localhost:5000/api/user/verify/${url}">link</a>
                </p>
            </div>
        </div>
    `;
    
    const msg = {
        to: email,
        from: { email: 'noreply@quannotate.com', name: 'QUANNOTATE' },
        subject: 'Please Verify Your Quannotate Account',
        html,
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

