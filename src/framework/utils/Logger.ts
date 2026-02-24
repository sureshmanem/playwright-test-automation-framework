/**
 * Logger Utility
 *
 * Provides structured, levelled logging for the framework.
 * All actions, assertions, and errors flow through this logger.
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

export class Logger {
  private static level: LogLevel = LogLevel.INFO;
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  static setLevel(level: LogLevel): void {
    Logger.level = level;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  debug(message: string, ...args: any[]): void {
    if (Logger.level <= LogLevel.DEBUG) {
      console.log(this.formatMessage('DEBUG', message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (Logger.level <= LogLevel.INFO) {
      console.log(this.formatMessage('INFO', message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (Logger.level <= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message), ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (Logger.level <= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message), ...args);
    }
  }

  step(stepText: string): void {
    this.info(`Step: ${stepText}`);
  }

  action(actionName: string, details: string): void {
    this.info(`Action: ${actionName} | ${details}`);
  }

  assertion(description: string, passed: boolean): void {
    const status = passed ? 'PASSED' : 'FAILED';
    this.info(`Assertion ${status}: ${description}`);
  }
}
