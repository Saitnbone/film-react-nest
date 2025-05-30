import { DevLogger } from '../dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен форматировать лог-сообщение с префиксом [LOG]', () => {
    logger.log('hello');
    expect(console.log).toHaveBeenCalledWith('[LOG]:', 'hello', undefined);
  });

  it('должен логировать ошибку с префиксом [ERROR]', () => {
    logger.error('Test error', 'stack trace');

    expect(console.log).toHaveBeenCalledWith(
      '[ERROR]:',
      'Test error',
      'stack trace',
      undefined,
    );
  });

  it('должен логировать предупреждение с префиксом [WARN]', () => {
    logger.warn('Warning!');
    expect(console.log).toHaveBeenCalledWith('[WARN]:', 'Warning!', undefined);
  });

  it('должен логировать debug-сообщение с префиксом [DEBUG]', () => {
    logger.debug('Debug info');
    expect(console.log).toHaveBeenCalledWith(
      '[DEBUG]:',
      'Debug info',
      undefined,
    );
  });

  it('должен логировать verbose-сообщение с префиксом [VERBOSE]', () => {
    logger.verbose('Verbose info');
    expect(console.log).toHaveBeenCalledWith(
      '[VERBOSE]:',
      'Verbose info',
      undefined,
    );
  });
});
