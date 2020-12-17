const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./artcles');

// app.use('/', userRoutes);
// app.use('/', articleRoutes);
router.use('/', userRouter);
router.use('/', articleRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не  найдена' });
});

module.exports = router;
