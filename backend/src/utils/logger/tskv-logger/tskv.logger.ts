import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    context?: string,
    stack?: string,
  ) {
    const entries = [
      `timestamp=${new Date().toISOString()}`,
      `level=${level}`,
      `context=${context || ''}`,
      `message=${message}`,
    ];

    if (stack) entries.push(`stack=${stack}`);

    return entries.join('\t') + '\n';
  }

  log(message: any, context?: string) {
    process.stdout.write(this.formatMessage(`[LOG]: ${message}`, context));
  }

  error(message: any, context?: string, stack?: string) {
    process.stderr.write(
      this.formatMessage(`[ERROR]: ${message}`, message, context, stack),
    );
  }

  warn(message: any, context?: string) {
    process.stdout.write(
      this.formatMessage(`[WARN]: ${message}`, message, context),
    );
  }

  debug(message: any, context?: string) {
    process.stdout.write(
      this.formatMessage(`[DEBUG]: ${message}`, message, context),
    );
  }

  verbose(message: any, context?: string) {
    process.stdout.write(
      this.formatMessage(`[VERBOSE]: ${message}`, message, context),
    );
  }
}
