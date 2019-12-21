// @flow
import { requestServices } from 'services';

const getDetails = (param) =>
  requestServices.customAxios.post("/folder/details", param).then((res) => res.data);

  const create = (param) =>
  requestServices.customAxios.post("/folder/create", param).then((res) => res.data);

export default {
  getDetails,
  create
};
