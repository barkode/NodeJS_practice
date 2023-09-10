const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "1a1a76c16effb1",
    pass: "d06378ec854bc9",
  },
});

async function sendEmail(data) {
  const { userName, userEmail, userMessage } = data;
  let output=`<h1>Вітаємо ви отримали листа від ${userName}</h1>
  <h2>Імеіл для звязку ${userEmail}</h2>
  <h2>Текст повідомлення ${userMessage}</h2>
  <p>Дякуєм що нам написали!</p>`;
  const info = await transporter.sendMail({
    from: '1a1a76c16effb1', // sender address
    to: "sorochankostya@gmail.com", // list of receivers
    subject: "Лист для директора",
    text: "Hello world?", // plain text body
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
}
module.exports = sendEmail;
