import React from 'react';
import $ from 'jquery';

export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: '',
      errorText: localStorage.errorTextLogin
    };
  }

  updateUsername(text) {
    this.setState({username: text.target.value});
  }

  updatePassword(text) {
    this.setState({password: text.target.value});
  }

  handleSubmit() {
    var object = {
      username: this.state.username,
      password: this.state.password
    };
    $.ajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify(object),
      contentType: 'application/json',
      success: function(data) {
        if (typeof data === 'string') {
          console.log('error message here', data);
          localStorage.setItem( 'errorTextLogin', data);
        } else if (typeof data.redirect === 'string') {
          console.log('redirection here');
          localStorage.setItem('errorTextLogin', '');
          window.location = data.redirect;
        }
      }
    });
    //record the username on localstorage
    localStorage.setItem('username', this.state.username);
  }

  render() {
    return (
      <div className="container">
        <div className = "row">
          <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Log in to MasterMind</h3>
              </div>
              <div className="panel-body">
                <form role = "form">
                  <div className="form-group">
                    <div className="error" dangerouslySetInnerHTML={{__html: this.state.errorText}}/>
                    <label>User Name</label>
                    <input type="text" name="username" className="form-control" placeholder="User Name" value={this.state.username}
                      onChange={this.updateUsername.bind(this)}/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password}
                      onChange={this.updatePassword.bind(this)}/>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

