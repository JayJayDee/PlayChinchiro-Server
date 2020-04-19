import 'dotenv/config';
import { exit } from 'process';

import { initMysqlConnection } from '../src/mysql';
import { logger } from '../src/logger';

const log = logger({ tag: 'db-sync' });

(async () => {
  log.info('starting db sync..');
  const connection = await initMysqlConnection({ logging: true });
  await connection.synchronize();
  log.info('db sync ended.');
  exit(0);
})();
