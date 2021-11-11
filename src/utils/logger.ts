import log4js from 'log4js';

log4js.configure({
  appenders: {
    fileAppender: { type: 'file', filename: './logs/ecommerce.log' },
    consola: { type: 'console' },
  },
  categories: {
    default: {
      appenders: ['fileAppender', 'consola'],
      level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
    },
  },
});

export const logger = log4js.getLogger();

//   logger.level = 'warn';
// logger.trace('Imprimimos Trace');
// logger.debug('Imprimimos Debug');
// logger.info('Imprimimos Info');
// logger.warn('Imprimimos Warn');
// logger.error('Imprimimos Error');
// logger.fatal('Imprimimos Fatal');
