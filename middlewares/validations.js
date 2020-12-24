const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateObjId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(100)
      .messages({
        'any.required': 'Поле Keyword должно быть заполнено',
        'string.min': 'Минимальная длина поля Keyword – 2',
        'string.max': 'Максимальная длина поля Keyword – 100',
      }),
    title: Joi.string().required().min(2).max(500)
      .messages({
        'any.required': 'Поле Title должно быть заполнено',
        'string.min': 'Минимальная длина поля Title – 2',
        'string.max': 'Максимальная длина поля Title – 500',
      }),
    text: Joi.string().required().min(10).max(100000)
      .messages({
        'any.required': 'Поле Text должно быть заполнено',
        'string.min': 'Минимальная длина поля Text – 10',
        'string.max': 'Максимальная длина поля Text – 10000',
      }),
    date: Joi.string().required().min(4).max(25)
      .messages({
        'any.required': 'Поле Date должно быть заполнено',
        'string.min': 'Минимальная длина поля Date – 4',
        'string.max': 'Максимальная длина поля Date – 25',
      }),
    source: Joi.string().required().min(2).max(200)
      .messages({
        'any.required': 'Поле Source должно быть заполнено',
        'string.min': 'Минимальная длина поля Source – 2',
        'string.max': 'Максимальная длина поля Source – 200',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный URL в поле Link');
    })
      .messages({
        'any.required': 'Поле Link должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный URL в поле Image');
    })
      .messages({
        'any.required': 'Поле Image должно быть заполнено',
      }),
  }),
});

const celebrateSigninKeys = {
  email: Joi.string().required().email()
    .messages({
      'any.required': 'Поле Email должно быть заполнено',
      'string.email': 'В поле Email должнен быть введен валидный e-mail',
    }),
  password: Joi.string().required().min(5).max(20)
    .messages({
      'any.required': 'Поле Password должно быть заполнено',
      'string.min': 'Минимальная длина поля Password – 5',
      'string.max': 'Максимальная длина поля Password – 20',
    }),
};

const celebrateSignupKeys = {
  ...celebrateSigninKeys,
  name: Joi.string().required().min(2).max(30)
    .messages({
      'any.required': 'Поле Name должно быть заполнено',
      'string.min': 'Минимальная длина поля Name – 2',
      'string.max': 'Максимальная длина поля Name – 30',
    }),
};

const validateSigninBody = celebrate({
  body: Joi.object().keys(celebrateSigninKeys),
});

const validateSignupBody = celebrate({
  body: Joi.object().keys(celebrateSignupKeys),
});

module.exports = {
  validateArticleBody,
  validateSigninBody,
  validateSignupBody,
  validateObjId,
};
