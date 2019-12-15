const list = ['mp4', 'mp3', 'ogg', 'img', 'docx', 'doc', 'pdf', 'jpg', 'png'];
export const canView = filename => {
  const ext = filename.split('.')[filename.split('.').length - 1];
  if (list.indexOf(ext) != -1) return true;
  return false;
};
