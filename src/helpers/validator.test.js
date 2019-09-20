import { usernameValidator, fullnameValidator, passwordValidator } from './validator';

describe('Test username validator', () => {
  it('Test invalid username_invalid character', () => {
    expect(usernameValidator('longhoang_08')).toBe(false);
  });

  it('Test invalid username_too short', () => {
    expect(usernameValidator('abcde')).toBe(false);
  });

  it('Test invalid username_too long', () => {
    expect(usernameValidator('abcdeabcdeabcdeabcdef')).toBe(false);
  });

  it('Test valid username_1', () => {
    expect(usernameValidator('abcd12')).toBe(true);
  });

  it('Test valid username_2', () => {
    expect(usernameValidator('abcde12345abcde12345')).toBe(true);
  });
});

describe('Test fullname validator', () => {
  it('Test invalid fullname_invalid character', () => {
    expect(fullnameValidator('longhoang_08')).toBe(false);
  });

  it('Test invalid fullname_too short', () => {
    expect(fullnameValidator('abcde a')).toBe(false);
  });

  it('Test invalid fullname_have number', () => {
    expect(fullnameValidator('abcde 21a')).toBe(false);
  });

  it('Test valid fullname_1', () => {
    expect(fullnameValidator('Hoang Long Bao')).toBe(true);
  });

  it('Test valid fullname_2', () => {
    expect(fullnameValidator('Bao Long')).toBe(true);
  });
});

describe('Test password validator', () => {
  it('Test invalid password_invalid character', () => {
    expect(passwordValidator('longhoang_08')).toBe(false);
  });

  it('Test invalid password_too short', () => {
    expect(passwordValidator('abcde 4')).toBe(false);
  });

  it('Test valid password_1', () => {
    expect(passwordValidator('HoangLongBao')).toBe(true);
  });

  it('Test valid fullname_2', () => {
    expect(passwordValidator('Bao21332Long')).toBe(true);
  });
});
