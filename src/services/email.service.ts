import config from '../config';
import { Options } from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

export default class EmailService {
  private transport: nodemailer.Transporter;

  constructor() {
    this.initializeTransport();
  }

  private initializeTransport() {
    this.transport = nodemailer.createTransport({
      host: config.mail.host,
      port: Number(config.mail.port),
      auth: {
        user: config.mail.username,
        pass: config.mail.password,
      },
    });
  }

  public async sendEmail(to: string | string[], subject: string, message: string) {
    const mailOptions: Options = {
      from: `"${config.mail.name}" <${config.mail.username}>`,
      to: to,
      subject: subject,
      html: message,
    };
    return await this.transport.sendMail(mailOptions);
  }
}
