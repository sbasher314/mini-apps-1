window.addEventListener('load', event => {
  let filepath;
  let csv;

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
    event.preventDefault();
    document.getElementById('JSON-upload').value = '';
    document.getElementById('remove-file').style['display'] = 'none';
    document.getElementById('submit').removeAttribute('disabled');
    handler(event);
  });

  if (document.getElementById('JSON-upload').value !== '' || document.getElementById('JSON-textarea').value !== '') {
    document.getElementById('submit').removeAttribute('disabled');
  }
  if (document.getElementById('JSON-upload').value !== '') {
    document.getElementById('remove-file').style['display'] = '';
  }

  document.getElementById('submit').addEventListener('click', event => {
    event.preventDefault();
    let form = event.target.form;
    let data = new FormData(form);
    fetch('/convert', {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(result => {
      if (result.filepath) {
        filepath = result.filepath
      }
      csv = decodeURIComponent(result.data).replaceAll('%0A', '\n').replaceAll('%20', ' ');
      let node = document.createElement('p');
      node.style['white-space'] = 'pre';
      node.style['font-family'] = 'monospace'
      node.appendChild(document.createTextNode(csv));
      node.setAttribute('id', 'output');
      document.getElementById('output').outerHTML = node.outerHTML;
      if (result.data === 'Invalid input') {

      } else {
        document.getElementById('download').setAttribute('path', filepath);
        document.getElementById('download').removeAttribute('disabled');
      }
      document.getElementById('CSV').style['display'] = '';
    })
    .catch(error => {
      console.error('Error: ', error);
    });
  });

  document.getElementById('download').addEventListener('click', event => {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
      element.setAttribute('download', 'csv_report.csv');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
  });
});