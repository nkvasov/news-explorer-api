require('dotenv').config();

// const { NODE_ENV, JWT_SECRET } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler.js');
const { mongoPath } = require('./utils/constants');

const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rate-limiter');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(rateLimiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);

// {
//   "_id": "5fdb278523a8f007b1b7322c",
//   "name": "nick",
//   "email": "nkvasov@yandex.ru",
//   "password": "$2a$10$GsSEfkSk6ezdF8Ztd/WXwuiG.QH0Fwo5Ggk.LFJnjOlmb3DvqEaWO",
//   "__v": 0
// }

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRiMjc4NTIzYThmMDA3YjFiNzMyMmMiLCJpYXQiOjE2MDgxOTgxNzIsImV4cCI6MTYwODgwMjk3Mn0.Pjq4IvziQw9oeIWTy7XaAWuwYhALGn53jQhNU9MBGLQ"
// }

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRmMjJmN2RjMWVkOTA1ZmQ3OGI0MjIiLCJpYXQiOjE2MDg0NTkwNjcsImV4cCI6MTYwOTA2Mzg2N30.5lJKW2nKQ7hNWlgFsdhK9S8CSJXAZj4sp_EJRkJPfe8"
// }
