import React from 'react';

export const Login = () => {
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
                  <input type="text" name="username" className="form-control" placeholder="User Name" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

