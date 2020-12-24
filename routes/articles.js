const router = require('express').Router();
const { validateArticleBody, validateObjId } = require('../middlewares/validations');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', validateArticleBody, createArticle);

router.delete('/:articleId', validateObjId, deleteArticle);

module.exports = router;
