import { LogDatasource } from "../../domain/datasorces/log.datasource";
import { LogEntity, enumLogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";


export class LogRepositoryImpl implements LogRepository {

  constructor(private readonly logDataSource: LogDatasource) {};

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: enumLogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
  
};