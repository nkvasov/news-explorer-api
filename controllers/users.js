require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV } = require('../configs/index');
const User = require('../models/user');
const { SALT_ROUND } = require('../configs/index');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');
const messages = require('../utils/constants');

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  if (!id) {
    throw new AuthError(messages.authErr);
  }
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError(messages.notFoundUserErr);
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!email || !password || !name) {
    throw new ValidationError(messages.validationUserSignupErr);
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(messages.conflictEmailErr);
      }
      return bcrypt.hash(password, SALT_ROUND);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError(messages.validationUserSigninErr);
  }
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new AuthError(messages.authDataErr);
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthError(messages.authDataErr);
        }
        return user;
      }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  createUser,
  login,
};
