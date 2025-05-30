import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutSpy: jest.SpyInstance;
  let stderrSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
    stderrSpy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('логирует сообщение через log с передачей context', () => {
    logger.log('hello', 'AppContext');

    expect(stdoutSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=[LOG]: hello'),
    );
    expect(stdoutSpy).toHaveBeenCalledWith(
      expect.stringContaining('message=AppContext'),
    );
  });

  it('должен логировать ошибку через error', () => {
    logger.error('Something went wrong', 'ErrorContext', 'StackTraceHere');

    const logged = stderrSpy.mock.calls[0][0];

    expect(logged).toContain('level=[ERROR]: Something went wrong');
    expect(logged).toContain('context=ErrorContext');
    expect(logged).toContain('stack=StackTraceHere');
  });

  it('должен логировать предупреждение через warn', () => {
    logger.warn('Warning message', 'AppContext');

    const logged = stdoutSpy.mock.calls[0][0];

    expect(logged).toContain('level=[WARN]: Warning message');
    expect(logged).toContain('message=Warning message');
    expect(logged).toContain('context=AppContext');
  });

  describe('debug', () => {
    it('должен логировать debug-сообщение с контекстом', () => {
      logger.debug('Debug info', 'DebugContext');

      const logged = stdoutSpy.mock.calls[0][0];
      expect(logged).toContain('level=[DEBUG]: Debug info');
      expect(logged).toContain('message=Debug info');
      expect(logged).toContain('context=DebugContext');
    });

    it('должен логировать debug-сообщение без контекста', () => {
      logger.debug('Debug info');

      const logged = stdoutSpy.mock.calls[0][0];
      expect(logged).toContain('level=[DEBUG]: Debug info');
      expect(logged).toContain('context=');
    });
  });

  describe('verbose', () => {
    it('должен логировать verbose-сообщение с контекстом', () => {
      logger.verbose('Verbose details', 'VerboseContext');

      const logged = stdoutSpy.mock.calls[0][0];
      expect(logged).toContain('level=[VERBOSE]: Verbose details');
      expect(logged).toContain('message=Verbose details');
      expect(logged).toContain('context=VerboseContext');
    });

    it('должен логировать verbose-сообщение без контекста', () => {
      logger.verbose('Verbose details');

      const logged = stdoutSpy.mock.calls[0][0];
      expect(logged).toContain('level=[VERBOSE]: Verbose details');
      expect(logged).not.toContain('context=VerboseContext');
    });
  });
});
