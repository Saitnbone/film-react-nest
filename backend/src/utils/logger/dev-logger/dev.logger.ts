export class DevLogger {
  log(message: string, context?: string) {
    console.log('[LOG]:', message, context);
  }
  error(message: string, stack?: string, context?: string) {
    console.log('[ERROR]:', message, stack, context);
  }
  warn(message: string, context?: string) {
    console.log('[WARN]:', message, context);
  }
  debug(message: string, context?: string) {
    console.log('[DEBUG]:', message, context);
  }
  verbose(message: string, context?: string) {
    console.log('[VERBOSE]:', message, context);
  }
}
