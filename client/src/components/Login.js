import React from 'react';
import $ from 'jquery';


export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  updateUsername(text) {
    this.setState({username: text.target.value})
    console.log('state username', this.state.username)
  }

  updatePassword(text) {
    this.setState({password: text.target.value})
    console.log('state password', this.state.password)
  }

  handleSubmit() {

    var object = {
      username: this.state.username,
      password: this.state.password
    }
    $.ajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify(object),
      contentType: "application/json",
      success: function(data) {
        if (typeof data.redirect === 'string') {
          window.location = data.redirect;
        }
      }
    })

  }

  render(){
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
  };
}

