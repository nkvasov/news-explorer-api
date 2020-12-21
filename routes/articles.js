const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(100),
    title: Joi.string().required().min(2).max(500),
    text: Joi.string().required().min(10).max(100000),
    date: Joi.string().required().min(4).max(25),
    source: Joi.string().required().min(2).max(200),
    link: Joi.string().required().pattern(/^https?:\/\/(www\.)?[^а-яё\s]{3,}#?$/),
    image: Joi.string().required().pattern(/^https?:\/\/(www\.)?[^а-яё\s]{3,}#?$/),
  }),
}), createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = router;
