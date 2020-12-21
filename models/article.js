const { Schema, model } = require('mongoose');
const validator = require('validator');

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  text: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100000,
  },
  date: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
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
    ref: 'user',
    select: false,
  },
});

module.exports = model('article', articleSchema);
