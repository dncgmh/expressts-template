import { createServer, Server } from 'http';
import 'reflect-metadata';
import { init as initApp } from './app';
import { configService } from './common/config';
import { databaseService } from './common/database';
import { logger } from './common/helper';
import './common/util/prototype.ext';

const port = configService.getEnv('PORT') || 4000;
const env = configService.getEnv('NODE_ENV');

logger.info('Selected Env  - %s', env);
logger.info('Selected Port - %s', port);

export const httpServer: Server = createServer();

function start(): Server {
  databaseService.connect();
  return httpServer.listen(port, () => {
    logger.info('Server is started');
  });
}

async function stop() {
  try {
    logger.info('Server is stopping...');
    databaseService.disconnect();
    httpServer.close();
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

async function main() {
  logger.info(`Starting server...`);
  httpServer.addListener('request', initApp());

  process.on('SIGINT', stop).on('SIGTERM', stop).on('unhandledRejection', logger.error);

  start();
}

main();
