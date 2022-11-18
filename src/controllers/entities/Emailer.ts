import { Transporter, createTransport } from 'nodemailer'
import Notification from '../../services/db/models/Notification'

export default class Emailer extends Notification {
  private readonly transport: Transporter

  constructor (data: Notification) {
    super()

    this.access_token = data.access_token
    this.message = data.message
    this.address = data.address
    this.subject = data.subject
    this.html = data.html

    this.transport = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  async send (): Promise<void> {
    await this.transport.sendMail({
      from: 'UbiCar <$(proccess.env.EMAIL_ADDRESS)>',
      to: [this.address],
      subject: this.subject,
      html: this.html
    })
  }
}
