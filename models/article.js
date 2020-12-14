const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  keyword: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
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
      validator(v) {
        const regex = /^https?:\/\/(www\.)?[^а-яё\s]{3,}#?$/;
        return regex.test(v);
      },
      message: 'Невалидный URL-адрес',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^https?:\/\/(www\.)?[^а-яё\s]{3,}#?$/;
        return regex.test(v);
      },
      message: 'Невалидный URL-адрес',
    },
  },
  owner: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = model('card', articleSchema);
