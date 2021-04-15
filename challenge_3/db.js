const mongoose = require('mongoose');
const { Schema } = mongoose;
const connection = mongoose.connect('mongodb://localhost/challenge3', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  address : {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zipcode: String,
  },
  phonenumber: String,
  creditcard : {
    cardnumber: String,
    expiration: String,
    CVV: String,
    zipcode: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  connection,
  User
}