import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service'
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogReposytory = new LogRepositoryImpl(new FileSystemDatasource);

export class Server {
  public static start() {
    console.log('Server corriendo');

    //const url: string = 'https://google.com';
    const url: string = 'http://localhost:3000';

    CronService.createJob(
      '*/3 * * * * *',
      () => {
        new CheckService(
          fileSystemLogReposytory,
          () => console.log(`${url} responde OK`),
          (error) => console.log(error)
        ).execute(url);
      }
    );

    
  };
};