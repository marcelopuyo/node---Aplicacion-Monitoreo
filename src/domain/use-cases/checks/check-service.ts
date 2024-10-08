import {
  ILogEntityOptions,
  LogEntity,
  enumLogSeverityLevel,
} from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements ICheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

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
        this.logRepository.saveLog(log);
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
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
