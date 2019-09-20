import * as EmailValidator from 'email-validator';

const isString = (value) => typeof value === 'string' || value instanceof String;

const isAlnum = (ch) => ch.match(/^[a-z0-9A-Z]+$/i) !== null;

const isAlpha = (ch) => ch.match(/^[a-zA-Z\s]+$/i) !== null;

export const usernameValidator = (username) => {
  if (!isString(username) || !isAlnum(username)) return false;
  return username.length >= 6 && username.length <= 20;
};

export const fullnameValidator = (fullname) => {
  if (!isString(fullname) || !isAlpha(fullname)) return false;
  return fullname.length >= 8 && fullname.length <= 100;
};

export const emailValidator = (email) => {
  if (!isString(email)) return false;
  return EmailValidator.validate(email);
};

export const passwordValidator = (password) => {
  if (!isString(password) || !isAlnum(password)) return false;
  return !!(password.length >= 8 && password.length <= 100);
};
