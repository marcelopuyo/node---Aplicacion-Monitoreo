import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface ISendEmailOptions {
  para: string | string[];
  asunto: string;
  htmlBody: string;
  attachments?: IAttachment[];
}

interface IAttachment {
  filename: string;
  path: string;
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_PSW_APP_GOOGLE,
    },
  });

  async sendEmail(options: ISendEmailOptions): Promise<boolean> {
    const { para: para, asunto: asunto, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: para,
        subject: asunto,
        html: htmlBody,
        attachments: attachments
      });

      console.log(sentInformation);

      return true;
    } catch (error) {

      console.log(error);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(para: string | string[]): Promise<boolean> {
    const asunto = 'Logs del Servidor';
    const htmlBody = `
    <h3>Logs de sistema</h3>
    <p>loren ipsum dolor fin</p>
    <h4>------------------------------------------------</H4>
    <h4>Fin logs de sistema</H4>
  `;
    const attachments: IAttachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];

    return this.sendEmail({ para, asunto, htmlBody, attachments });
  }
}
