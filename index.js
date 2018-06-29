const uuid = require('uuid/v4');

const getDuration = time => {
  const [seconds, nanoseconds] = process.hrtime(time);

  return Math.round(seconds * 1e3 + nanoseconds / 1e6);
};

module.exports = logger => {
  if (!logger) throw new Error('You must pass pino instance');

  return fn => (req, res) => {
    const time = process.hrtime();
    const id = req.headers['x-request-id'] || uuid();

    logger.info({ req, id }, `Request ${id} started`);

    res.on('finish', () => {
      logger.info(
        { res, id, duration: getDuration(time) },
        `Request ${id} finished`
      );
    });

    res.on('error', err => {
      logger.info(
        { res, id, err, duration: getDuration(time) },
        `Request ${id} errored`
      );
    });

    return fn(req, res);
  };
};
