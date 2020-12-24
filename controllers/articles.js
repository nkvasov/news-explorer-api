const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const messages = require('../utils/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const createArticle = async (req, res, next) => {
  try {
    let newArticle = await Article.create({ ...req.body, owner: req.user._id });
    if (!newArticle) {
      throw new NotFoundError(messages.notFoundUnknownErr);
    }
    newArticle = newArticle.toJSON();
    delete newArticle.owner;

    return res.status(201).send(newArticle);
  } catch (error) {
    return next(error);
  }
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError(messages.notFoundArticleErr);
    })
    .select('+owner')
    .then((article) => {
      if (article.owner !== req.user._id) {
        throw new ForbiddenError(messages.forbiddenArticleRemovalErr);
      }
      return article.remove();
    })
    .then((article) => {
      if (!article) {
        throw new NotFoundError(messages.notFoundUnknownErr);
      }
      const response = article.toJSON();
      delete response.owner;
      return res.status(200).send(response);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
