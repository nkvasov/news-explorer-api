const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth.js');

const userRouter = require('./users');
const articlesRouter = require('./articles');
const { validateSigninBody, validateSignupBody } = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-err');
const messages = require('../utils/constants');

router.post('/signup', validateSignupBody, createUser);

router.post('/signin', validateSigninBody, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articlesRouter);

router.use(() => {
  throw new NotFoundError(messages.notFoundUrlErr);
});

module.exports = router;
