const { Schema, model } = require('mongoose');
const validator = require('validator');

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
  },
  keyword: {
    type: String,
    required: [true, 'Поле "keyword" должно быть заполнено'],
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Невалидный URL-адрес в поле "link"',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Невалидный URL-адрес в поле "image"',
    },
  },
  owner: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = model('article', articleSchema);
