import { LogRepositoryImpl } from '../../../infrastructure/repositories/log.repository.impl';
import { EmailService } from '../../../presentation/email/email-service';
import { enumLogSeverityLevel, LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface ISendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements ISendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepositoryImpl
  ) {}

  async execute(to: string | string[]) {
    try {
      const enviado = this.emailService.sendEmailWithFileSystemLogs(to);

      if (!enviado) {
        throw new Error('El email no se pudo enviar');
      }

      const log = new LogEntity({
        level: enumLogSeverityLevel.low,
        message: 'Email enviado',
        origin: 'send-email.logs.ts',
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: enumLogSeverityLevel.high,
        message: `${error}`,
        origin: 'send-email.logs.ts',
      });

      this.logRepository.saveLog(log);
      return false;
    }

    return true;
  }
}
