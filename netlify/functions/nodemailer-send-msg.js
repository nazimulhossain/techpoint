require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    const { name, email } = JSON.parse(event.body);

    const firstName = name.split(' ')[0];
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      // secure: true, // true for 465, false for other ports
      logger: true,
      auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    const mailOptions = {
      from: `"Techpoint Support" <${process.env.EMAIL_FROM}>`, // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: `Hello ${firstName}`, // plain text body
      html: '<b>Hello world?</b>', // html body
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: info.messageId,
    };
  } catch (err) {
    console.log(err);
  }
};
