import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен логировать log-сообщение в формате JSON', () => {
    logger.log('test message', 'AppContext');

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('"level":"[LOG]: test message"'),
    );
  });

  it('должен логировать ошибку в формате JSON', () => {
    logger.error('error occurred', 'ErrorContext', 'stack trace');

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('"level":"[ERROR]: error occurred"'),
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('"stack":"stack trace"'),
    );
  });

  it('должен логировать предупреждение в формате JSON', () => {
    logger.warn('this is a warning', 'WarnContext');

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('"level":"[WARN]: this is a warning"'),
    );
  });

  it('должен логировать debug-сообщение', () => {
    logger.debug('debugging info', 'DebugContext');

    expect(console.debug).toHaveBeenCalledWith(
      'debug',
      expect.stringContaining('"level":"[DEBUG]: debugging info"'),
    );
  });

  it('должен логировать verbose-сообщение в формате JSON', () => {
    logger.verbose('verbose message', 'VerboseContext');

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('"level":"[VERBOSE]: verbose message"'),
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('"context":"VerboseContext"'),
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('"message":"verbose message"'),
    );
  });
});
