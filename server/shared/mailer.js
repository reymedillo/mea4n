var nodemailer = require('nodemailer'),
smtpTransport = require('nodemailer-smtp-transport'),
mail_config = require('../config/mail.js');

var transporter = nodemailer.createTransport(smtpTransport(mail_config));
exports.deliverMail = function(recepient, subject, body) {
  var mailOptions = {
    to: recepient,
    from: mail_config.auth.user,
    subject: subject,
    text: body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
      console.log('There is a problem sending an email.', err);
    }
    console.log('Email send successfully.', info);
  });
}
