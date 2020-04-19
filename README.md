# PlayChinchiro-Server
API/Socket.IO server for play-chinchiro services.

## What is Chinchiro?
Chinchiro is a gambling game played with three six-sided dice. It is a simple gamble that is played a lot in Japan.

## Requirements
- node.js 12.x
- MySQL or MariaDB
- Redis

## Commands
Before run the commands, you must prepare `.env` file in your project root. For the contents of the `.env` file, refer to the `Configurations` section at the bottom.
### Run API server + SocketIO server
```bash
npm install
npm run dev
```
### Synchronize DB
```bash
npm run util:sync
```

## Configurations
```bash
HTTP_PORT=3000

ENABLE_REDIS_ADAPTER=true # if redisAdapter needed, set true.
REDIS_HOST=xxxx # redis host
REDIS_PORT=xxxx # redis port

MYSQL_HOST=xxxx
MYSQL_PORT=3306
MYSQL_DATABASE=xxxx
MYSQL_USER=xxxx
MYSQL_PASSWORD=xxxx
```

## RestAPI Reference
TBD

## Socket.IO Protocol Reference
TBD 