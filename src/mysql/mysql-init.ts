import { createConnection } from 'typeorm';

import { cfgMandantory, cfgOptional } from '../configurator';
import { logger } from '../logger';
import { Entities } from './entities';

const log = logger({ tag: 'mysql-connector' });

const MYSQL_HOST = cfgMandantory('MYSQL_HOST');
const MYSQL_PORT = cfgOptional('MYSQL_PORT', 3306);
const MYSQL_USER = cfgMandantory('MYSQL_USER');
const MYSQL_PASSWORD = cfgMandantory('MYSQL_PASSWORD');
const MYSQL_DATABASE = cfgMandantory('MYSQL_DATABASE');

type MysqlConnectParam = {
  logging?: boolean;
};

export const createMySQLConnection =
  async (param?: MysqlConnectParam) => {
    log.info(`establishing mysql connnection... host:${MYSQL_HOST}`);

    const connection = await createConnection({
      type: 'mysql',
      host: MYSQL_HOST,
      port: Number(MYSQL_PORT),
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      synchronize: false,
      entities: Entities,
      logging:
        param ? param.logging ? param.logging : false : false
    });

    log.info(`mysql connnection ok.`);
    return connection;
  };
