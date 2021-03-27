window.addEventListener('load', event => {
  var match = document.cookie.match(new RegExp("(^| )" + 'CSV' + "=([^;]+)"));
  document.cookie = '';
  if (match) {
    let csv = match[2];
    csv = decodeURIComponent(csv).replaceAll('%0A', '\n');
    let node = document.createElement('p');
    node.style['white-space'] = 'pre';
    node.style['font-family'] = 'monospace'
    let header = document.createElement('h2');
    header.innerHTML = 'CSV:';
    node.appendChild(header);
    node.appendChild(document.createTextNode(csv));
    document.body.append(node);
  }

});