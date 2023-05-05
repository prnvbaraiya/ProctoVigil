const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const viewPath = path.resolve(__dirname, "./../templates/views");

const MailingSystem = {
  sendMail: (mailOption) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs",
          defaultLayout: false,
          express,
        },
        viewPath,
        extName: ".hbs",
      })
    );

    const mailOptions = {
      from: '"Pranav from Proctovigil" <no-reply@proctovigil.com>',
      ...mailOption,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        return true;
      }
    });
  },
};

module.exports = { MailingSystem };
