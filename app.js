require('dotenv').config();

const { NODE_ENV, MONGO_PATH } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler.js');
const { MONGO_PATH_DEV } = require('./configs/index');

const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rate-limiter');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_PATH : MONGO_PATH_DEV, {
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
