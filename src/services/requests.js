// @flow
import axios from 'axios';
// import { splitMessageToNotification, splitMessageFromServer } from 'helpers/StringProcess';
// import { SERVER_ERROR } from 'constants/NotificationObj';
// import { CUSTOM_CODE } from 'constants/CustomCode';

export const BASE_API_URL: string = `${process.env.REACT_APP_BASE_API_URL || 'localhost:3000'}`;

const customAxios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // const { data } = error.response;
      // const serverMessage = data.message;
      // const customCode = data.custom_code;
      // Todo: Handle error here
    }
    return Promise.reject(error);
  },
);

export default { customAxios };
