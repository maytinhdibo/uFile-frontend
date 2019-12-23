const icons = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'json', 'png', 'jpg', 'mp4', 'mp3', 'zip'];
export function iconParse(filename, isFolder) {
  if (isFolder) return '/img/mime-type/folder.svg';
  filename = filename || '';
  const ext = filename.split('.').pop();
  if (icons.indexOf(ext) != -1) {
    return '/img/mime-type/' + ext + '.svg';
  } else {
    return '/img/mime-type/unknown.svg';
  }
}
