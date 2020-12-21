const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const createArticle = async (req, res, next) => {
  try {
    const newArticle = await Article.create({ ...req.body, owner: req.user._id });
    if (!newArticle) {
      throw new NotFoundError('Ошибка! Что-то пошло не так. Попробуйте еще раз');
    }
    return res.status(201).send(newArticle);
  } catch (error) {
    return next(error);
  }
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError('Ошибка! Что-то пошло не так. Попробуйте еще раз');
    })
    .select('+owner')
    .then((article) => {
      if (article.owner !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую статью');
      }
      return Article.findByIdAndRemove(req.params.articleId);
    })
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Ошибка! Что-то пошло не так. Попробуйте еще раз');
      }
      return res.status(200).send(article);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
