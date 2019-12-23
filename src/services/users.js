// @flow
import { requestServices } from 'services';
import {
 API_REGISTER, API_LOGIN, API_FETCH_USER, API_LOGOUT, API_FORGOT_PASSWORD 
} from 'constants/Links';

const fetchUsers = () => requestServices.customAxios.get('/').then((res) => res.data);

const submitRegister = (param) => requestServices.customAxios.post(API_REGISTER, param).then((res) => res.data);

const submitLoginRequest = (param) => requestServices.customAxios.post(API_LOGIN, param).then((res) => res.data);

const fetchUserStatus = () => requestServices.statusAxios.get(API_FETCH_USER).then((res) => res.data);

const submitLogoutRequest = () => requestServices.customAxios.post(API_LOGOUT).then((res) => res.data);

const findByIds = (param) => requestServices.customAxios.post("/users/info", param).then((res) => res.data);

const changePass = (param) => requestServices.customAxios.post("/profile/change_password", param).then((res) => res.data);

const submitForgotPasswordRequest = (param) =>
  requestServices.customAxios.post(API_FORGOT_PASSWORD, param).then((res) => res.data);

export default {
  fetchUsers,
  submitRegister,
  submitLoginRequest,
  fetchUserStatus,
  submitLogoutRequest,
  submitForgotPasswordRequest,
  findByIds,
  changePass
};
