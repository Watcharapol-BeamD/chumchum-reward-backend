const nodemailer = require("nodemailer");

const sendEmail = async ( ) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "gmail",
      service:'gmail',
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "chumchumth@gmail.com",
        pass: "mnwh cvnx sreg huxa",
      },
    });

    const message = {
      from: '"BewBew 👻" ',
      to: "chumchumth@gmail.com",
      subject: "Reward Redemption",
      text: "Hello world?",
      html: "<b>Thank you for redeeming a reward.</b>",
    };

    await transporter.sendMail(message);

    console.log("Email sent successfully");
   
  } catch (err) {
    console.error("Error sending email:", err);
   
  }
};

module.exports = {
  sendEmail,
};