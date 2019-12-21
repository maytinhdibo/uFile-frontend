const icons = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'json', 'png', 'jpg', 'mp4', 'mp3', 'zip'];
export function iconParse(filename) {
  filename = filename || '';
  const ext = filename.split('.')[filename.split('.').length - 1];
  if (icons.indexOf(ext) != -1) {
    return '/img/mime-type/' + ext + '.svg';
  } else {
    return '/img/mime-type/unknown.svg';
  }
}
