import nodemailer from 'nodemailer';

export default class Emailer {
    
    constructor(address, subject, html) {
        this.address = address;
        this.subject = subject;
        this.html = html;

        this.transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: "tmbchnnvgazyxaah"
            }
        });
    }

    async send() {
        await this.transport.sendMail({
            from: `UbiCar <$(proccess.env.EMAIL_ADDRESS)>`,
            to: [this.address],
            subject: this.subject,
            html: this.html
        });
    }
    
}