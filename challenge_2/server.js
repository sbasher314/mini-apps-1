const express = require('express')
const bodyParser = require('body-parser');
const router = express.Router();
const app = express()

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));


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

  try {
    json = JSON.parse(json);
    iterate(json);
    CSV = properties.toString() + '\n';
    for (let i = 0; i < values.length; i++) {
      CSV += values[i].toString() + '\n';
    }
    return encodeURI(CSV);
  } catch {
    return "Invalid input"
  }

}

app.get('/convert', (req, res) => res.redirect("/"));

app.post('/convert', function (req, res) {

  res.cookie("CSV", convertJSON(req.body.JSON), {expires: new Date(Date.now() + 2000)});
  res.sendFile(__dirname + '/client/index.html');
})

app.use(router);
app.listen(3000, () => console.log('Listening on port 3000'));