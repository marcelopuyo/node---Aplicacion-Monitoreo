import {
  ILogEntityOptions,
  LogEntity,
  enumLogSeverityLevel,
} from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface ICheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements ICheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}
  
  private callRepositorySaveLog(log: LogEntity) {
    this.logRepository.forEach(repository => {
      repository.saveLog(log);
    });
  };

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error al chequear el servicio ${url}`);
      } else {
        const logOptions: ILogEntityOptions = {
          level: enumLogSeverityLevel.low,
          message: `Servicio ${url} OK`,
          origin: 'check-service.ts',
        };

        const log = new LogEntity(logOptions);
        this.callRepositorySaveLog(log);
        this.successCallback && this.successCallback();
        return true;
      }
    } catch (error) {
      const errorMessage = `Servicio ${url} caido. Error: ${error}`;

      const logOptions: ILogEntityOptions = {
        level: enumLogSeverityLevel.high,
        message: `Servicio ${url} caido. Error: ${error}`,
        origin: 'check-service.ts',
      };

      const log = new LogEntity(logOptions);
      this.callRepositorySaveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
