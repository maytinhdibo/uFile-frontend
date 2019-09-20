export const splitMessageToNotification = (message) => {
  const index = message.indexOf(':');
  return {
    message: message.substr(0, index),
    description: message.substr(index + 2),
  };
};

export const splitMessageFromServer = (serverMessage) => {
  const index = serverMessage.indexOf(':');
  return serverMessage.substr(index + 2);
};

export const isItImage = (type) => {
  if (type.length < 5) return false;
  const page = type.substr(0, 5);
  return page === 'image';
};
