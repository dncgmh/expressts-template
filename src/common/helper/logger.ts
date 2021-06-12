import chalk from 'chalk';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const fileFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `[${label}] [${timestamp}] [${level}]: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.label({ label: 'system' }),
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    fileFormat
  ),
  defaultMeta: { service: 'app' },
  transports: [
    new DailyRotateFile({
      filename: '%DATE%.log',
      maxSize: '20m',
      level: 'error',
      maxFiles: '14d',
      dirname: 'logs/errors'
    }),
    new DailyRotateFile({
      filename: '%DATE%.log',
      maxSize: '20m',
      maxFiles: '14d',
      dirname: 'logs'
    })
  ]
});

const levelColor = {
  info: '#8ab6d6',
  error: '#ff5200'
};

const prettyFormat = winston.format.printf(
  ({ level, message, label, timestamp }: { level: string; message: string; label: string; timestamp: string }) => {
    return `${timestamp} ${label ? chalk.hex('#e93b81')(`[${label}]`) : ''} | ${chalk.hex(levelColor[level])(
      level
    )}: ${chalk.hex('#e4bad4')(message)}`;
  }
);

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(prettyFormat)
  })
);
