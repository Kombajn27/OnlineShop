require('dotenv').config();
const config = require('config');
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', (req, res) => {
  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const outputText = `
    Nowa wiadomość od nodemailer kontakt ThinkTree dev. 
    data wysłania: ${dateNow} ${timeNow}, 
    temat: ${req.body.subject},
    klient: ${req.body.name}, 
    telefon: ${req.body.phone}, 
    email: ${req.body.email},
    wiadomość: ${req.body.message}
  `;
  const outputHTML = `
    <h2>Nodemailer Kontakt ThinkTree dev</h2>
    <h3>Temat: ${req.body.subject}</h3>
    <h3>Dane kontaktowe klienta</h3>
    <ul>
      <li>data wysłania: ${dateNow} ${timeNow}</li>
      <li>Imię: ${req.body.name}</li>
      <li>Telefon: ${req.body.phone}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Wiadomość:</h3>
    <p>${req.body.message}</p>
  `;

  const transporter = nodemailer.createTransport({
    /* service: 'gamil', */
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    /* tls: {
      rejectUnauthorized: false
    } */
  });

  const message = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Kontakt ThinkTree dev',
    text: outputText,
    html: outputHTML,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send(info);
  });
});

module.exports = router;
