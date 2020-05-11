import SocketIO from 'socket.io';

import './redis-adapter';

import { logger } from '../logger';
import { Server } from 'http';
import { configOptional } from '../configurator';
import { initRedisAdapter } from './redis-adapter';

const log = logger({ tag: 'socketio' });

const ENABLE_REDIS_ADAPTER = configOptional<string>('ENABLE_REDIS_ADAPTER');

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
