// @flow
import {requestServices} from 'services';

const searchUser = (username, page, ipp) => requestServices.customAxios.get('/admin/search_users?username=' + username + "&page=" + page + "&ipp=" + ipp).then(res => res.data);
const blockUser = (email) => requestServices.customAxios.post('/admin/block_user', {email: email}).then(res => res.data);
const unBlockUser = (email) => requestServices.customAxios.post('/admin/un_block_user', {email: email}).then(res => res.data);

export default {
    searchUser,
    blockUser,
    unBlockUser
};
