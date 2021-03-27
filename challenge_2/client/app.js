window.addEventListener('load', event => {

  let handler = event => {
    event.preventDefault();
    if (event.target.value === "") {
      if (event.type === "input") {
        document.getElementById('JSON-upload').removeAttribute('disabled')
      } else {
        document.getElementById('JSON-textarea').removeAttribute('disabled')
        document.getElementById('remove-file').style['display'] = 'none';
      }
      document.getElementById('submit').setAttribute('disabled', '');
    } else {
      if (event.type === "input") {
        document.getElementById('JSON-upload').setAttribute('disabled', '');
      } else {
        document.getElementById('JSON-textarea').setAttribute('disabled', '');
        document.getElementById('remove-file').style['display'] = '';
      }
      document.getElementById('submit').removeAttribute('disabled');
    }
  }
  document.getElementById('JSON-textarea').addEventListener('input', handler);
  document.getElementById('JSON-upload').addEventListener('change', handler);

  document.getElementById('remove-file').addEventListener('click', event => {
    document.getElementById('JSON-upload').value = '';
    document.getElementById('remove-file').style['display'] = 'none';
    handler(event);
  });

  if (document.getElementById('JSON-upload').value !== '' || document.getElementById('JSON-textarea').value !== '') {
    document.getElementById('submit').removeAttribute('disabled');
  }
  if (document.getElementById('JSON-upload').value !== '') {
    document.getElementById('remove-file').style['display'] = '';
  }



  var match = document.cookie.match(new RegExp("(^| )" + 'CSV' + "=([^;]+)"));
  document.cookie = '';
  if (match) {
    let csv = decodeURIComponent(match[2]).replaceAll('%0A', '\n').replaceAll('%20', ' ');

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