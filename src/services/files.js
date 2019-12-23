// @flow
import { requestServices } from 'services';

const searchDetails = param => requestServices.customAxios.post('/files/details', param).then(res => res.data);

const preview = id => requestServices.customAxios.get('/preview/'+id).then(res => res.data);

const star = param => requestServices.customAxios.post('/files/add_star', param).then(res => res.data);
const r_star = param => requestServices.customAxios.post('/files/remove_star', param).then(res => res.data);
const putback = param => requestServices.customAxios.post('/files/restore', param).then(res => res.data);
const moveToTrash = param => requestServices.customAxios.post('/files/temp_del', param).then(res => res.data);

const move = param => requestServices.customAxios.post('/files/move', param).then(res => res.data);
const copy = param => requestServices.customAxios.post('/files/copy', param).then(res => res.data);

const share = param => requestServices.customAxios.post('/files/share', param).then(res => res.data);
const rename = param => requestServices.customAxios.post('/files/rename', param).then(res => res.data);

const clearTrash = () => requestServices.customAxios.post('/files/clear-trash').then(res => res.data);

const upload = (data, config) => requestServices.statusAxios.put('/upload/', data, config).then(res => res.data);

export default {
  searchDetails,
  upload,
  star,
  r_star,
  moveToTrash,
  putback,
  preview,
  move, 
  copy,
  share,
  rename,
  clearTrash
};
