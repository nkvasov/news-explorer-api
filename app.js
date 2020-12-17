require('dotenv').config();

// const { NODE_ENV, JWT_SECRET, mongoPath } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');

const userRoutes = require('./routes/users.js');
const articleRoutes = require('./routes/artcles');
const routes = require('./routes/index');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

// app.use('/', userRoutes);
// app.use('/', articleRoutes);
app.use('/', routes);

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
