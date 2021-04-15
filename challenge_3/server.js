const db = require('./db.js');
const express = require('express');
const app = express();
const port = 3000;
const multer  = require('multer')
const upload = multer()

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/checkout', upload.none(), (req, res) => {
  let formData = req.body;
  if (formData.name !== undefined) {
    db.User.create({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      address : {
        line1: formData.line1,
        line2: formData.line2,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
      },
      phonenumber: formData.phonenumber,
      creditcard : {
        cardnumber: formData.cardnumber,
        expiration: formData.expiration,
        CVV: formData.cvv,
        zipcode: formData.zipcodecc
      }
    }, (err, doc) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(400)
  }

})

app.listen(port, () => {
  console.log(`multistep checkout listening at http://localhost:${port}`);
})

