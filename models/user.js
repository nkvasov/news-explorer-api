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
    maxlength: 100,
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = model('user', userSchema);
