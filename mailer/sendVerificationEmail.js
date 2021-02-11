const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, url) => {
    // using purely inline css because a lot of email clients removing style tags from html emails 
    const html = `
        <div style="width: 100%; height: 100%; background-color: #383838;">
            <div style="max-width: 450px; margin: 0 auto; padding: 15px; background-color: #212121;">
                <p style="font-size: 24px; color: #f1f8fc; text-align: center;">
                    Thank you for creating Quannotate account
                </p>
                <p style="font-size: 18px; color: #f1f8fc; text-align: center;">
                    Please verify your account by clicking this 
                    <a
                        style="text-decoration: none; color: #84c3ff;"
                        href="${url}"
                    >
                        link
                    </a>
                </p>
                <div style="margin: 20px 0;">
                    <p style="font-size: 15px; color: #f1f8fc; text-align: center;">
                        Email: 
                        <a 
                            style="text-decoration: none; color: #84c3ff;"
                            href="mailto:support@quannotate.com"
                        >
                            support@quannotate.com
                        </a>
                    </p>
                    <p style="font-size: 15px; color: #f1f8fc; text-align: center; margin-bottom: 20px;"> 
                        <a
                            style="text-decoration: none; color: #84c3ff; "
                            href="https://www.quannotate.com/"
                        >
                            https://www.quannotate.com/
                        </a>
                    </p>
                    <p style="font-size: 15px; color: #f1f8fc; text-align: center;">
                        <br />BHKLAB
                        <br />The MaRS Center
                        <br />TMDT room 11-310
                        <br />101 College Street Toronto, ON
                        <br />M5G 1L7, Canada
                    </p> 
                </div>
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

module.exports = sendVerificationEmail;