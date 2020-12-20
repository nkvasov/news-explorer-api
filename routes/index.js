const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth.js');

const userRouter = require('./users');
const articlesRouter = require('./articles');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articlesRouter);

router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не  найдена' });
});

module.exports = router;
