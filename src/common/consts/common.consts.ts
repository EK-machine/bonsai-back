export const VALIDATION_MSGS = {
  STOCK_IS_BOOL: 'Значение наличия на складе должно быть верно / ложно',
  STOCK_NOT_EMPTY: 'Вы не указали, естьли товар на складе',
  MAX_PRICE: 'Максимальная цена не должна превышать 999.99',
  MIN_PRICE: 'Минимальная цена не должна быть ниже 0.01',
  PRICE_NOT_EMPTY: 'Вы не указали цену',
  PRICE_CONSTRAINTS:
    'цена должна быть числом, соответствующим указанным ограничениям',
  IMG_IS_STRING: 'Путь к изображению должен быть строкой',
  IMG_NOT_EMPTY: 'Вы не указали путь к изображению',
  ARTICLE_NAME_NOT_EMPTY: 'Вы не указали название статьи',
  ARTICLE_NAME_IS_STRING: 'Название статьи должно быть строкой',
  ARTICLE_TEXT_NOT_EMPTY: 'Вы не указали текст статьи',
  ARTICLE_TEXT_IS_STRING: 'Текст статьи должен быть строкой',
  AUTH_EMAIL_NOT_EMPTY: 'Вы не указали email',
  AUTH_EMAIL_IS_NOT_EMAIL: 'Введённая строка не является email',
  AUTH_EMAIL_IS_STRING: 'Email должен быть строкой',
  AUTH_PASS_IS_STRING: 'Пароль должен быть строкой',
  AUTH_PASS_NOT_EMPTY: 'Вы не указали пароль',
  BONSAI_NAME_NOT_EMPTY: 'Вы не указали название бонсая',
  BONSAI_NAME_IS_STRING: 'Название бонсая должно быть строкой',
  BONSAI_DESCR_IS_STRING: 'Описание бонсая должно быть строкой',
  BONSAI_CATEGORY_IS_STRING: 'Название категории бонсая должно быть строкой',
  BONSAI_CATEGORY_NOT_EMPTY: 'Вы не указали название категории бонсая',
  BONSAI_LEVEL_IS_STRING:
    'Описание уровня ухода за бонсаем должно быть строкой',
  INSTRUMENT_DESCR_IS_STRING: 'Описание инструмента должно быть строкой',
  INSTRUMENT_NAME_NOT_EMPTY: 'Вы не указали название инструмента',
  INSTRUMENT_NAME_IS_STRING: 'Название инструмента должно быть строкой',
  POT_SHAPE_IS_NOT_CORRECT:
    'Указанная форма горшка не верна. Укажите круг, овал, квадрат, прямоугольник, треугольник, или бесформенный',
  POT_NAME_NOT_EMPTY: 'Вы не указали название горшка',
  POT_NAME_IS_STRING: 'Название горшка должно быть строкой',
  POT_SIZE_NOT_EMPTY: 'Вы не указали размер горшка',
  POT_SIZE_IS_STRING: 'Размер горшка должен быть строкой',
  POT_SHAPE_NOT_EMPTY: 'Вы не указали форму горшка',
  POT_SHAPE_IS_STRING: 'Форма горшка должна быть строкой',
  POT_COLOR_NOT_EMPTY: 'Вы не указали цвет горшка',
  POT_COLOR_IS_STRING: 'Цвет горшка должен быть строкой',
  POT_DESCR_IS_STRING: 'Описание горшка должно быть строкой',
  SERVICE_NAME_NOT_EMPTY: 'Вы не указали название услуги',
  SERVICE_NAME_IS_STRING: 'Название услуги должно быть строкой',
  SERVICE_DESCR_IS_STRING: 'Описание услуги должно быть строкой',
  SOIL_NAME_NOT_EMPTY: 'Вы не указали название грунта',
  SOIL_NAME_IS_STRING: 'Название грунта должно быть строкой',
  SOIL_DESCR_IS_STRING: 'Описание грунта должно быть строкой',
};

export const EXCEPTION_MSGS = {
  ARTICLE_NOT_FOUND: 'Нет статьи, которую вы ищите',
  USER_EXISTS: 'Администратор уже существует',
  USER_ONLY: 'В системе уже зарегистрирован администратор',
  INVALID_CREDENTIALS: 'Недействительные учетные данные',
  SOMETHING_WENT_WRONG: 'Что-то пошло не так',
  RT_MALFORMED: 'refresh token деформирован',
  BONSAI_NOT_FOUND: 'Нет бонсая, который вы ищите',
  INSTRUMENT_NOT_FOUND: 'Нет инструмента, который вы ищите',
  POT_NOT_FOUND: 'Нет горшка, который вы ищите',
  SERVICE_NOT_FOUND: 'Нет услуги, которую вы ищите',
  SOIL_NOT_FOUND: 'There is no soil you are looking for',
};

export const REFRESH_TOKEN = 'refreshToken';
export const SUCCESS = 'Успешно';

export const DECORATOR_CONSTS = {
  isAtPublic: 'isAtPublic',
  isRtPublic: 'isRtPublic',
};

export const POT_SHAPES = [
  'круг',
  'овал',
  'квадрат',
  'прямоугольник',
  'треугольник',
  'бесформенный',
];

export const ENV_CONSTS = {
  R_SECRET: 'R_SECRET',
  A_SECRET: 'A_SECRET',
};
