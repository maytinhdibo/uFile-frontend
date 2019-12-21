// @flow
import { requestServices } from 'services';

const searchDetails = param => requestServices.customAxios.post('/files/details', param).then(res => res.data);

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
};
