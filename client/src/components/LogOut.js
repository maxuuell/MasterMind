import React from 'react';
import $ from 'jquery';

export default class LogOut extends React.Component {
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
}