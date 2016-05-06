import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Login extends Component{
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
      //User Authentication
      var ref = new Firebase("https://luminous-torch-4088.firebaseio.com");
      ref.authWithPassword({
        email: this.state.username,
        password: this.state.password
      }, (error, userData) => {
        if (error) {
          this.setState({errormsg : 'Username or password is incorrect'});
          return false;
        } else {
          console.log("Successfully logged in:", userData.uid);
          //Redirect to gallery
          this.context.router.push('/home');
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
        <Link to={`/register`}><button type="button" className="btn btn-info">Create an account</button></Link>
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
          <input type="submit" value="Log In"/>
        </form>
      </div>
    );
  }
}