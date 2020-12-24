const messages = {
  authErr: 'Ошибка авторизации',
  authNeedErr: 'Необходима авторизация',
  authDataErr: 'Неправильные почта или пароль',
  notFoundUserErr: 'Пользователь с таким id не найден',
  validationUserSignupErr: 'Введите имя пользователя, e-mail и пароль',
  validationUserSigninErr: 'Введите e-mail и пароль',
  validationPasswordErr: 'Пароль должен состоять минимум из пяти символов',
  conflictEmailErr: 'Пользователь с таким e-mail уже существует',
  notFoundUnknownErr: 'Ошибка! Что-то пошло не так. Попробуйте еще раз',
  notFoundArticleErr: 'Ошибка! Статья с указанным id не найдена в базе',
  forbiddenArticleRemovalErr: 'Вы не можете удалить чужую статью',
  notFoundUrlErr: 'Страница по указанному маршруту не найдена',
};

module.exports = messages;
