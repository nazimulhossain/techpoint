require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    const { name, email, message, mobile } = JSON.parse(event.body);

    const firstName = name.split(' ')[0];
    const transporter = nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      // port: process.env.EMAIL_PORT,
      // secure: false,
      service: 'gmail',
      host: 'smtp.gmail.com',
      logger: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Techpoint Support" <${process.env.EMAIL_FROM}>`, // sender address
      to: email, // list of receivers
      subject: 'We have received your message', // Subject line
      text: `Hello ${firstName}, Thank you for contacting us. Our team will respond within 24 hours. `, // plain text body
      html: `
            <p>Thank you for contacting us. We have received your email.</p>
            <p>Our team will respond within 24 hours.</p>
            <p>Here is your details : </p>
            <p>Name : ${name}</p>
            <p>Email : ${email}</p>
            <p>Mobile : ${mobile}</p>
            <p>Message : ${message}</p>
      
      
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);
  }
};
