module.exports = {
  smtpSettings: {
    development: {
      transporter: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
    production: {
      transporter: {
        host: 'in-v3.mailjet.com',
        port: 587,
        auth: {
          user: process.env.MAILJET_USER,
          pass: process.env.MAILJET_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
  },
}
