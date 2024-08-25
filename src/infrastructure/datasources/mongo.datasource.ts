import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasorces/log.datasource';
import {
  LogEntity,
  enumLogSeverityLevel,
} from '../../domain/entities/log.entity';

export class MongoDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
  }

  async getLogs(severityLevel: enumLogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel
    });

    return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
  }
}
