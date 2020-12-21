const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введите валидный e-mail, пожалуйста',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 5,
    maxlength: 20,
  },
});

module.exports = model('user', userSchema);
