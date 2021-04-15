class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      formData: new FormData()
    }
  }

  lastStep() {
    this.setState({step: this.state.step - 1});
  }

  nextStep() {
    this.setState({step: this.state.step + 1});
    console.log(this.state.step);
  }

  visible(step) {
    return {display: this.state.step === step ? "flex" : "none"};
  }

  updateData(event) {
    let total = 0;
    //form1 validation
    total += document.getElementById('name').value !== '';
    total += document.getElementById('email').value !== '';
    total += document.getElementById('password').value !== '';
    if (total === 3) {
      document.getElementById('f1next').removeAttribute('disabled');
    } else {
      document.getElementById('f1next').setAttribute('disabled', "");
    }
    //form2 validation
    total += document.getElementById('line1').value !== '';
    total += document.getElementById('city').value !== '';
    total += document.getElementById('state').value !== '';
    total += document.getElementById('zipcode').value !== '';
    total += document.getElementById('phonenumber').value !== '';
    if (total === 8) {
      document.getElementById('f2next').removeAttribute('disabled');
    } else {
      document.getElementById('f2next').setAttribute('disabled', "");
    }
    //form3 validation
    total += document.getElementById('cardnumber').value !== '';
    total += document.getElementById('expiration').value !== '';
    total += document.getElementById('cvv').value !== '';
    total += document.getElementById('zipcodecc').value !== '';
    if (total === 12) {
      document.getElementById('f3next').removeAttribute('disabled');
    } else {
      document.getElementById('f3next').setAttribute('disabled', "");
    }
    this.setState({formData: new FormData(document.getElementsByTagName('form')[0])});
    console.log(this.state.formData);
  }

  getData(key) {
    return this.state.formData.get(key);
  }

  submit() {
    axios.post('/checkout', this.state.formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (res.data === 'OK') {
          this.nextStep();
        } else {
          alert('Something went wrong...')
        }

      })
      .catch(console.error);
  }

  render() {
    let homepage = (
      <fieldset style={this.visible(0)} name="checkout">
        <input type="button" value="Checkout" onClick={() => {
          this.updateData();
          this.nextStep();
        }}/>
      </fieldset>
    );
    let form1 = (
      <fieldset style={this.visible(1)} name="user">
        <h3>User info</h3>
        <label>Name:
          <input id="name" name="name" type="text" placeholder="name" required></input>
        </label>
        <label>Email:
          <input id="email" name="email" type="email" placeholder="email" required></input>
        </label>

        <label>Password:
          <input id="password" name="password" type="password" placeholder="password" required></input>
        </label>
        <span>
          <input type="button" id="f1next" value="Next" onClick={() => this.nextStep()}/>
          <input type="button" value="Back" onClick={() => this.lastStep()}/>
        </span>
      </fieldset>
    );
    let form2 = (
      <fieldset style={this.visible(2)} name="details">
        <h3>Address</h3>
        <label>Line1:
          <input type="text" id="line1" name="line1" required></input>
        </label>
        <label>Line2:
          <input type="text" id="line2" name="line2" placeholder="unit # -- optional"></input>
        </label>
        <label>City:
          <input type="text" id="city" name="city" required></input>
        </label>
        <label>State:
          <input type="text" id="state" name="state" required></input>
        </label>
        <label>Zipcode:
          <input type="text" id="zipcode" name="zipcode" required></input>
        </label>
        <h3>Phone Number</h3>
        <input type="tel" id="phonenumber" name="phonenumber" required></input>
        <span>
          <input type="button" id="f2next" value="Next" onClick={() => this.nextStep()}/>
          <input type="button" value="Back" onClick={() => this.lastStep()}/>
        </span>
      </fieldset>
    );
    let form3 = (
      <fieldset style={this.visible(3)} name="billing">
        <h3>Billing info</h3>
        <label>Credit Card #:
          <input type="tel" name="cardnumber" id="cardnumber" autoComplete="cc-number" required></input>
        </label>
        <label>Expiry:
          <input minLength="4" maxLength="5" type="month" name="expiration" id="expiration" autoComplete="expiration" required></input>
        </label>
        <label>CVV:
          <input minLength="3" maxLength="5" type="tel" name="cvv" id="cvv" required></input>
        </label>
        <label>zipcode:
          <input minLength="5" maxLength="5" type="tel" name="zipcodecc" id="zipcodecc" required></input>
        </label>
        <span>
          <input type="button" id="f3next" value="Next" onClick={() => this.nextStep()}/>
          <input type="button" value="Back" onClick={() => this.lastStep()}/>
        </span>

      </fieldset>
    );
    let confirmation = (
      <fieldset style={this.visible(4)} name="confirmation">
        {Array.from(this.state.formData).map(a => <label>{a[0]}: {a[1]}</label>)}
        <input type="submit" value="Confirm" onClick={(e) => {
            e.preventDefault();
            if (this.state.step === 4) {
              this.submit();
            } else {
              console.error('attempted to send incomplete form')
            }
          }} />
        <input type="button" value="Back" onClick={() => this.lastStep()}/>
      </fieldset>
    );
    let success = (
      <fieldset style={this.visible(5)} name="success">
        <h1>Thank you for your purchase!</h1>
      </fieldset>
    );
    let states = [homepage, form1, form2, form3, confirmation, success]
    return (
      <form onChange={(e) => this.updateData(e)}>{states.map(val => val)}</form>
    )
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('App')
);