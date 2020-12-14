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
    // нужно задать поведение по умолчанию
  },
});

module.exports = model('user', userSchema);
