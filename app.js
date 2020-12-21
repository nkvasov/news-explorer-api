require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
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
