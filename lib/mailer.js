const nodemailer = require('nodemailer')
const Email = require('email-templates')
const config = require('../config/mail')

const mailer = async amountOfReleases => {
  try {
    const email = new Email({
      message: {
        from: `"Jerome" <${process.env.EMAIL_SENDER}>`,
        replyTo: `${process.env.EMAIL_REPLY_TO}`,
        to: process.env.EMAIL_RECIPIENT,
      },
      preview: true,
      send: true,
      transport: nodemailer.createTransport(
        config.smtpSettings[process.env.NODE_ENV].transporter
      ),
    })

    email
      .send({
        template: 'importReleaseRapport',
        locals: {
          message: `${amountOfReleases} item(s) have been added to the collection`,
        },
      })
      .then(console.log)
      .catch(console.error)
  } catch (error) {
    console.log(error)
  }
}

module.exports = mailer
