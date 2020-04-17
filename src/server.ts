import 'dotenv/config';

import { initApiServer } from './apiserver';
import { cfgMandantory } from './configurator';
import { logger } from './logger';

const log = logger({ tag: 'server' });

const HTTP_PORT = cfgMandantory('HTTP_PORT');

(async () => {
  const apiServerApp = initApiServer();

  apiServerApp.listen(HTTP_PORT, () =>
    log.info(`server started, port: ${HTTP_PORT}`));
})();