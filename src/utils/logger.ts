import { createLogger, format, transports } from 'winston'
import { join } from 'path'

export default class CustomLogger {
  private logger: any

  constructor(className: string) {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(
              (info) =>
                `[${className}] ${info.timestamp} ${info.level}: ${info.message}`
            )
          ),
        }),
        new transports.File({
          filename: join(__dirname, '../../logs/combined.log'),
        }),
      ],
    })
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta)
  }

  error(message: string, error?: any) {
    this.logger.error(message, error)
  }
}
