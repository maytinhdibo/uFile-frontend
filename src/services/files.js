// @flow
import { requestServices } from 'services';

const searchDetails = param => requestServices.customAxios.post('/files/details', param).then(res => res.data);
const star = param => requestServices.customAxios.post('/files/add_star', param).then(res => res.data);
const r_star = param => requestServices.customAxios.post('/files/remove_star', param).then(res => res.data);
const putback = param => requestServices.customAxios.post('/files/restore', param).then(res => res.data);
const moveToTrash = param => requestServices.customAxios.post('files/temp_del', param).then(res => res.data);

const upload = (data, config) => requestServices.statusAxios.put('/upload', data, {

  headers: {
    'crossDomain': 'true',
    'Content-Type': 'multipart/form-data',
  },

  // onUploadProgress (progressEvent) {
  //   console.log({ progressEvent });
  // }

}).then(res => res.data);

export default {
  searchDetails,
  upload,
  star,
  r_star,
  moveToTrash,
  putback
};