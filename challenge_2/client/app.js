window.addEventListener('load', event => {
  var match = document.cookie.match(new RegExp("(^| )" + 'CSV' + "=([^;]+)"));
  document.cookie = '';
  let csv = match ? match[2] : "";
  csv = decodeURIComponent(csv).replaceAll('%0A', '\n');
  let node = document.createElement('p');
  node.style['white-space'] = 'pre';
  node.appendChild(document.createTextNode(decodeURIComponent(csv)));
  document.body.append(node);
});