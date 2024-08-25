import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasorces/log.datasource";
import { LogEntity, enumLogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
};

export class PostgresDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {

  const newLog = await prismaClient.logModel.create({
    data: {
      level: severityEnum[log.level],
      message: log.message,
      origin: 'App.ts'
    }
  });
};

  async getLogs(severityLevel: enumLogSeverityLevel): Promise<LogEntity[]> {

    const logs = await prismaClient.logModel.findMany({
      where: {
        level: severityEnum[severityLevel]
      }
    });
    return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
  }
  
};