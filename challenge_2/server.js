const express = require('express')
const bodyParser = require('body-parser');
const upload = require('multer')({ dest: 'uploads/' });
const cors = require('cors');
const router = express.Router();
const app = express()
const fs = require('fs');

app.use(cors());
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
//app.use(express.urlencoded({extended: true}));


let convertJSON = json => {
  let properties = [];
  let values = [];
  let CSV = "";

  function iterate(node, row = 0,) {
    while(values[row] !== undefined) {
      row++;
    }
    values[row] = [];
    for (const property in node) {
      if (property !== 'children') {
        if (properties.indexOf(property) < 0) {
          properties.push(property);
        }
        values[row][properties.indexOf(property)] = node[property];
      } else {
          for (let i = 0; i < node['children'].length; i++) {
            iterate(node['children'][i], row + 1);
          }
      }
    }
  }

  return new Promise((resolve, reject) => {
    json = JSON.parse(json);
    iterate(json);
    CSV = properties.toString() + '\n';
    for (let i = 0; i < values.length; i++) {
      CSV += values[i].toString() + '\n';
    }
    resolve(encodeURI(CSV));
  }).catch(err => "Invalid input");

}

app.get('/convert', (req, res) => res.redirect("/"));

app.post('/convert', upload.single('fileUpload'), function (req, res) {
  let setCookie = (value) => {
    convertJSON(value)
    .then(data => {
      res.json({filepath: req.file?.path, data: data})
    })
    .catch(console.err)
    .finally(() => res.end());
  }

  if (req.file !== undefined) {
    let stream = fs.createReadStream(req.file.path);
    let json = '';
    stream.on('data', (data) => json += data);
    stream.on('end', (data) => {
      setCookie(json);
    })
  } else if (req.body !== undefined) {
    setCookie(req.body.JSON);
  } else {
    setCookie();
  }
})

app.post('/download', (req, res) => {
  res.sendFile(__dirname + '/' + req.body.filepath);
});

app.use(router);
app.listen(3000, () => console.log('Listening on port 3000'));