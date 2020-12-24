require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV } = require('../configs/index.js');
const AuthError = require('../errors/auth-error');
const messages = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthError(messages.authNeedErr);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new AuthError(messages.authNeedErr);
  }

  req.user = payload;
  return next();
};

module.exports = auth;
