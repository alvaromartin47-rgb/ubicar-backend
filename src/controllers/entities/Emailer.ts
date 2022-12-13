import { Transporter, createTransport } from 'nodemailer'
import { Notification } from '../../services/db/models/Notification'

export default class Emailer {
  private readonly transport: Transporter
  private readonly notification: Notification

  constructor (notification: Notification) {
    this.notification = notification

    this.transport = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_ADDRESS as string,
        pass: process.env.EMAIL_PASSWORD as string
      }
    })
  }

  async send (): Promise<void> {
    await this.transport.sendMail({
      from: 'UbiCar <$(proccess.env.EMAIL_ADDRESS)>',
      to: [this.notification.address],
      subject: this.notification.subject,
      html: this.notification.html
    })
  }
}
