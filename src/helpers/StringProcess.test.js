import { splitMessageToNotification } from './StringProcess';

describe('Test split message to notification', () => {
  it('Split', () => {
    expect(JSON.stringify(splitMessageToNotification('400 Bad Request: Wrong password'))).toBe(
      JSON.stringify({
        message: '400 Bad Request',
        description: 'Wrong password',
      }),
    );
  });
});
