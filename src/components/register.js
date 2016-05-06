import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Register extends Component{
  //Setting context to use React Router push funtcion
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {username:'', password:'', errormsg:''};
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onFormSubmit(event){
    event.preventDefault();
    this.setState({errormsg : ''});
    if(this.state.username == '' || this.state.password == '')
      return false;
    else{
      //User creation
      var ref = new Firebase("https://luminous-torch-4088.firebaseio.com");
      ref.createUser({
        email: this.state.username,
        password: this.state.password
      }, (error, userData) => {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              this.setState({errormsg : 'This email has already been taken'});
              break;
            case "INVALID_EMAIL":
              this.setState({errormsg : 'The email address appears to be invalid'});
              break;
            default:
              this.setState({errormsg : 'Something went wrong. Make sure you typed in a valid email and password.'})
          }
          return false;
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          //Redirect
          this.context.router.push('/login');
        }
      });
    }


  }
  onUsernameChange(event){
    this.setState({ username : event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password : event.target.value });
  }
  render(){
    return(
      <div>
        <Link to={`/login`}><button type="button" className="btn btn-info">Go to Login</button></Link>
        <br /><br />
        <form onSubmit={this.onFormSubmit}>
          <input
            type="email"
            value={this.state.username}
            placeholder="Email"
            onChange={this.onUsernameChange}
          />
          <br />
          <input
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.onPasswordChange}
          />
          <div>{this.state.errormsg}</div>
          <br />
          <input type="submit" value="Create Account"/>
        </form>
      </div>
    );
  }
}