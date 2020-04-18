# PlayChinchiro-Server
API/Socket.IO server for play-chinchiro services.

## What is Chinchiro?
Chinchiro is a gambling game played with three six-sided dice. It is a simple gamble that is played a lot in Japan.

## How to run
```bash
npm install
npm run dev
```

## Configurations
```
HTTP_PORT=3000

ENABLE_REDIS_ADAPTER=true # if redisAdapter needed, set true.
REDIS_HOST=xxx # redis host
REDIS_PORT=xxx # redis port
```