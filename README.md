# `micro-pino`

## About

Log requests in [`micro`](https://github.com/zeit/micro) with [`pino`](https://github.com/pinojs/pino).

## Usage

```javascript
const microPino = require('micro-pino');
const pino = require('pino');

const logger = pino({
  name: 'my-app',
  serializers: pino.stdSerializers
});

module.exports = microPino( logger)(async (res, req) => 'Hello world!');
```

```json
{
  "level": 30,
  "time": 1530286753564,
  "msg": "Request 884d1305-dafd-481e-a2b3-941c30138927 finished",
  "pid": 79758,
  "hostname": "localdomain",
  "res": {
    "statusCode": 200,
    "header":
      "HTTP/1.1 200 OK\r\nAccess-Control-Request-Method: GET\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 43\r\nDate: Fri, 29 Jun 2018 15:39:13 GMT\r\nConnection: keep-alive\r\n\r\n"
  },
  "id": "884d1305-dafd-481e-a2b3-941c30138927",
  "duration": 5,
  "v": 1
}
```

### Log object

`id` and `duration` are added to the log object. [UUID v4](https://github.com/kelektiv/node-uuid) or `X-Request-ID` header is used for id and duration is calculated with [`hrtime`](https://nodejs.org/api/process.html#process_process_hrtime_time)
