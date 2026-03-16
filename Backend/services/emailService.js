

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    stream: process.stdout
});

/**
 * Sends an OTP to the user's email.
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The one-time password to send.
 */
const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: '"Your App Name" <no-reply@yourapp.com>',
        to: email,
        subject: 'Your One-Time Password (OTP)',
        text: `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`,
        html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email} (mocked). OTP: ${otp}`);
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};

module.exports = { sendOtpEmail };
