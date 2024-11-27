import winston from 'winston';

class CustomLogger {
  private logger: winston.Logger;

  constructor() {
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4
    };

    const colors = {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'white'
    };

    winston.addColors(colors);

    const format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.colorize({ all: true }),
      winston.format.printf((info) => {
        const { timestamp, level, message, ...rest } = info;
        const additionalInfo = Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : '';
        return `${timestamp} ${level}: ${message}${additionalInfo}`;
      })
    );

    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      levels,
      format,
      transports: [new winston.transports.Console()]
    });
  }

  log(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  http(message: string, meta?: any) {
    this.logger.http(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }
}

export const Logger = new CustomLogger();
