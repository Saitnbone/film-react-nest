import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    context?: string,
    stack?: string,
  ) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
      stack,
    });
  }
  log(message: any, context: string) {
    console.log(this.formatMessage(`[LOG]: ${message}`, context));
  }

  error(message: any, context?: string, stack?: string) {
    console.error(
      this.formatMessage(`[ERROR]: ${message}`, message, context, stack),
    );
  }

  warn(message: any, context?: string) {
    console.warn(this.formatMessage(`[WARN]: ${message}`, context));
  }

  debug(message: any, context?: string) {
    console.debug('debug', this.formatMessage(`[DEBUG]: ${message}`, context));
  }

  verbose(message: any, context?: string) {
    console.log(this.formatMessage(`[VERBOSE]: ${message}`, message, context));
  }
}
