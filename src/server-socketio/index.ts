import SocketIO from 'socket.io';

import { logger } from '../logger';
import { Server } from 'http';

const log = logger({ tag: 'socketio' });

export const initSocketIOSever =
  async (server: Server) => {
    const io = SocketIO(server);

    io.on('connection', (socket) => {
      log.debug('connected', socket.id);

      socket.on('disconnect', () => {
        log.debug('disconnected', socket.id);
      });
    });

    return io;
  };
