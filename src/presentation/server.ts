import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service'
export class Server {
  public static start() {
    console.log('Server corriendo');

    const url: string = 'https://google.com';

    CronService.createJob(
      '*/3 * * * * *',
      () => {
        new CheckService(
          () => console.log(`${url} responde OK`),
          (error) => console.log(error)
        ).execute(url);
        //new CheckService().execute('http://localhost:3000');
      }
    );

    
  };
};