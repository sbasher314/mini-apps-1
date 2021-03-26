const express = require('express')
const bodyParser = require('body-parser');
const router = express.Router();
const app = express()

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));


let convertJSON = json => {
  let properties = [];
  let CSV = "";
  try {
    json = JSON.parse(json);
    for (const property in json) {
      console.log(property+": "+json[property]);
      if (property !== 'children') {
        if (properties.indexOf(property) < 0) {
          properties.push(property);
          CSV += property+",";
        }
      }
    }
    CSV = CSV.slice(0, -1) + '\n';
    CSV += CSV;
    return encodeURI(CSV);
  } catch {
    return "Invalid input"
  }

}
app.post('/convert', function (req, res) {

  res.cookie("CSV", convertJSON(req.body.JSON), {expires: new Date(Date.now() + 2000)});
  res.sendFile(__dirname + '/client/index.html');
})

app.use(router);
app.listen(3000, () => console.log('Listening on port 3000'));