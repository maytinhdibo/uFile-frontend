const list = ['mp4', 'mp3', 'ogg', 'jpeg', 'docx', 'doc', 'xls','xlsx', 'ppt','pptx', 'pdf', 'jpg', 'png','zip'];
export const canView = filename => {
  const ext = filename.split('.')[filename.split('.').length - 1];
  if (list.indexOf(ext) != -1) return true;
  return false;
};
