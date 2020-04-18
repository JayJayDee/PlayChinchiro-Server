import SocketIO from 'socket.io';

import './redis-adapter';

import { logger } from '../logger';
import { Server } from 'http';
import { cfgOptional } from '../configurator';
import { initRedisAdapter } from './redis-adapter';

const log = logger({ tag: 'socketio' });

const ENABLE_REDIS_ADAPTER = cfgOptional('ENABLE_REDIS_ADAPTER', null);

export const initSocketIOSever =
  async (server: Server) => {
    const io = SocketIO(server);

    if (ENABLE_REDIS_ADAPTER) {
      const adapter = await initRedisAdapter();
      io.adapter(adapter);
    }

    io.on('connection', (socket) => {
      log.debug('connected', socket.id);

      socket.on('disconnect', () => {
        log.debug('disconnected', socket.id);
      });
    });

    log.info('socketio server initialized');
    return io;
  };
