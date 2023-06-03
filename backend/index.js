const logger = require('./utils/logger.js');
const app = require('./api');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`service is running mode :: ${env} :: listening at ${PORT}`)
});