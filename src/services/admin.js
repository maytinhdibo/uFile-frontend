// @flow
import { requestServices } from 'services';

const searchUser = (username, page, ipp) => requestServices.customAxios.get('/admin/search_users?username='+username+"&page="+page+"&ipp="+ipp).then(res => res.data);

export default {
  searchUser
};
