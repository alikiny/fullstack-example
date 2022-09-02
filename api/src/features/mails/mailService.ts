import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const sendGreetingEmail = async (to: string, confirmLink: string) => {
  try {
    return await sgMail.send({
      from: process.env.SENDER || '',
      to: to,
      subject: 'Welcome to EPO secondhand shop',
      text: 'Greeting message',
      html: `<p>Thank you for choosing sustainability</p>\
            <a href=${confirmLink}>Confirm your account</a>`,
    })
  } catch (e) {
    throw e
  }
}

export default {
  sendGreetingEmail,
}
