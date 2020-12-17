const SALT_ROUND = 10;
const JWT_SECRET_DEV = 'INFINITE SADNESS';
// адрес Mongo-сервера
const mongoPath = 'mongodb://localhost:27017/newsdb';

module.exports = {
  SALT_ROUND,
  JWT_SECRET_DEV,
  mongoPath,
};
