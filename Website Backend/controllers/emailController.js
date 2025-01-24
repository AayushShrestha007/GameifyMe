// controllers/emailController.js

const nodemailer = require('nodemailer');

// Function to send email
const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., Gmail, Outlook, etc.
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
    });

    // Email options
    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender's name and email
        to: 'Secondshare007@gmail.com', // Receiver's email
        subject: 'New Contact Us Message',
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
        html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Failed to send message. Please try again later.' });
    }
};

module.exports = {
    sendContactEmail,
};
