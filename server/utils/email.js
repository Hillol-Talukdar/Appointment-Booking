const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        //for mailtrap
        // host: process.env.EMAIL_HOST,
        // secureConnection: false,
        // port: process.env.EMAIL_PORT,

        // for gmail
        service: 'gmail',

        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnAuthorized: true,
        },
    });

    const mailOptions = {
        from: options.email,
        to: `${process.env.EMAIL_FROM}`,
        subject: options.subject,
        text: `${options.name} (${options.email}) (${options.mobile}) says: ${options.message}`,
    };
    await transporter.sendMail(mailOptions);

    // transporter.sendMail(mailOptions, function (err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Email sent successfully");
    //     }
    // });
};

module.exports = sendEmail;
