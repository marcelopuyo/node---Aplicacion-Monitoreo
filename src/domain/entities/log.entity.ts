export enum enumLogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface ILogEntityOptions {
  level: enumLogSeverityLevel;
  message: string;
  origin: string;
  createAt?: Date;
}

export class LogEntity {
  public level: enumLogSeverityLevel;
  public message: string;
  public origin: string;
  public createAt: Date;

  constructor(options: ILogEntityOptions) {
    const { level, message, origin, createAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createAt = createAt;
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message: message,
      level: level,
      createAt: createAt,
      origin: origin
    });

    return log;
  }

  static fromObject(object: {[key: string]: any}): LogEntity {
    const { message, level, createAt, origin } = object;

    const log = new LogEntity({ message, level, createAt, origin });

    return log;
  };
}
