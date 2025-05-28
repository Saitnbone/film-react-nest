import { DevLogger } from './dev-logger/dev.logger';
import { TskvLogger } from './tskv-logger/tskv.logger';
import { JsonLogger } from './json-logger/json.logger';
import { LoggerService } from '@nestjs/common';

export const getLogger = (): LoggerService => {
  const loggerType = process.env.LOGGER_TYPE || 'dev';

  switch (loggerType) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    default:
      return new DevLogger();
  }
};
