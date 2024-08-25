import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service'
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoDatasource } from "../infrastructure/datasources/mongo.datasource";
import { enumLogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresDatasource } from "../infrastructure/datasources/postgres.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogReposytory = new LogRepositoryImpl(new FileSystemDatasource());
const postgresLogReposytory = new LogRepositoryImpl(new PostgresDatasource());
const mongoLogReposytory = new LogRepositoryImpl(new MongoDatasource());

//const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server corriendo...');

    const url: string = 'https://google.com';
    //const url: string = 'http://localhost:3000';

    CronService.createJob(
      '*/3 * * * * *',
      () => {
        new CheckServiceMultiple(
          [fsLogReposytory, postgresLogReposytory, mongoLogReposytory],
          () => console.log(`${url} responde OK`),
          (error) => console.log(error)
        ).execute(url);
      }
    );

    //envio de correo desde el caso de uso
    // new SendEmailLogs(emailService, fileSystemLogReposytory)
    // .execute(['marcelopuyo@outlook.com', 'marcelopuyo@icloud.com']);

    //const emailService = new EmailService();

    // //prueba envio correo sin adjunto
    // emailService.sendEmail({
    //   para: 'marcelopuyo@outlook.com',
    //   asunto: 'Logs de sistema',
    //   htmlBody: `
    //     <h3>Logs de sistema</h3>
    //     <p>loren ipsum dolor fin</p>
    //     <h4>------------------------------------------------</H4>
    //     <h4>Fin logs de sistema</H4>
    //   `
    // });
    //----------------------------------------------------------------------------

    //prueba envio correo con adjuntos
    // emailService.sendEmailWithFileSystemLogs(
    //   ['marcelopuyo@outlook.com',
    //     'marcelopuyo@icloud.com'
    //   ]);


    //----------------------------------------------------------------------------
    //servicio de monitoreo

    //console.log(await logReposytory.getLogs(enumLogSeverityLevel.high));
    
  };
};