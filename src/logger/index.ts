import moment from 'moment';
import 'moment-timezone';

const makeLog = (args: any[], tag: string, subTag?: string) =>
  [`${moment().tz('Asia/Seoul').format('YYYY-MM-DD hh:mm:ss')} [${tag}${subTag ? `/${subTag}` : ''}]`, ...args];

export const logger =
  ({ tag, subTag }: {
    tag: string,
    subTag?: string
  }) =>

  ({
    debug: (...args: any[]) => console.debug(...makeLog(args, tag, subTag)),
    info: (...args: any[]) => console.info(...makeLog(args, tag, subTag)),
    error: (...args: any[]) => console.error(...makeLog(args, tag, subTag)),
  });

export const newLogger = () => null;